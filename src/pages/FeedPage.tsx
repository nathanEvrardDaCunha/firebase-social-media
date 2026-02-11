// Any user can read publications
// Only authenticated user can write publications
// Only authenticated user can delete their, and only their, own publications
// No user should be able to modify his publications
// TODO: Will need to limit the number of publication to not load 5000+ one at the same time.
// TODO: Relaod the display to display the up-to-date publications.
// TODO: For "(userId !== auth.currentUser?.uid)" pass the uid as props from single source of truth and already verified

import { collection, deleteDoc, doc, getDocs } from 'firebase/firestore';
import WritePublicationForm from '../components/WritePublicationForm';
import { auth, db } from '../config/firebase-config';
import { useEffect, useState } from 'react';
import {
    PublicationSchema,
    type PublicationFields,
} from '../schemas/PublicationSchema';

const FeedPage = () => {
    const [publications, setPublications] = useState<PublicationFields[]>([]);

    const publicationsCollectionRef = collection(db, 'publications');

    // Extract this to "ReadPublications"
    useEffect(() => {
        const getPublications = async () => {
            try {
                const data = await getDocs(publicationsCollectionRef);

                const filteredData = data.docs.map((doc) => {
                    const publication = PublicationSchema.parse({
                        id: doc.id,
                        userId: doc.data().userId,
                        message: doc.data().message,
                        creationDate: doc.data().creationDate,
                    });

                    return publication;
                });

                console.log(filteredData);

                setPublications(filteredData);
            } catch (error) {
                console.error(error);
            }
        };

        getPublications();
    }, []);

    const handleDeletePublication = async (id: string, userId: string) => {
        try {
            if (!auth.currentUser) {
                throw new Error('User should first be authenticated.');
            }

            if (userId !== auth.currentUser.uid) {
                throw new Error('User is not owner of this publication.');
            }

            const publication = doc(db, 'publications', id);
            await deleteDoc(publication);

            setPublications(publications.filter((pub) => pub.id !== id));
        } catch (error) {
            console.error(error);
        }
    };

    // TODO: make all arrow function into regualr function
    function isUserAllowToDelete(id: string, userId: string) {
        if (!auth.currentUser) {
            return null;
        }

        if (userId !== auth.currentUser.uid) {
            return null;
        }

        return (
            <button onClick={() => handleDeletePublication(id, userId)}>
                Delete
            </button>
        );
    }

    return (
        <section>
            <h1>Feed page</h1>

            {/* IDEA: Export the publications display to it's own module */}
            {publications.length > 0 ? (
                publications.map((publication) => (
                    <section key={publication.id}>
                        <h4>{publication.userId}</h4>

                        <time datatype={publication.creationDate.toUTCString()}>
                            {publication.creationDate.toUTCString()}
                        </time>

                        <p>{publication.message}</p>

                        {isUserAllowToDelete(
                            publication.id,
                            publication.userId
                        )}
                    </section>
                ))
            ) : (
                <h1>No publications yet.</h1>
            )}

            {/* TODO: CHeck if it really make sure the currentUser is defined for the form to appear */}
            {auth.currentUser ? <WritePublicationForm /> : null}
        </section>
    );
};

export default FeedPage;
