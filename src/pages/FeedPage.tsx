// Any user can read publications
// Only authenticated user can write publications
// Only authenticated user can delete their, and only their, own publications
// No user should be able to modify his publications
// TODO: Will need to limit the number of publication to not load 5000+ one at the same time.

import { collection, getDocs } from 'firebase/firestore';
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
