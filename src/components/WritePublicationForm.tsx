// TODO: create features/publications folder.
// IDEA: Except for user creation, make other document with name "Read...", "Write...", "Update...", "Delete..." ?
// IDEA: Check how to enforce the same form validation on Firebase because client-side is unsecure.
// IDEA: Should "publicationsCollectionRef" be pass as prop to ensure single source of truth ?
// TODO: WIll need to verify no slur are contained in the message of form "data".
// IDEA: Add setTimeout of 1 second to make the user "feel" the backend is "processing" (psychologic trick).
// IDEA: Should I receive the userId as a prop to only possess one source of truth ? => In theory the form appear only when connected so currentUser should already be tested.
// TODO: Change placeholders
// TODO: Relaod the display to display the up-to-date publications.

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, type SubmitHandler } from 'react-hook-form';
import {
    WritePublicationFormAddDocSchema,
    WritePublicationFormInputSchema,
    type WritePublicationFormInputType,
} from '../schemas/PublicationSchema';
import { auth, db } from '../config/firebase-config';
import { addDoc, collection } from 'firebase/firestore';

const WritePublicationForm = () => {
    const {
        register,
        handleSubmit,
        setError,
        formState: { errors, isSubmitting },
    } = useForm<WritePublicationFormInputType>({
        resolver: zodResolver(WritePublicationFormInputSchema),
    });

    const publicationsCollectionRef = collection(db, 'publications');

    const handleWritePublication: SubmitHandler<
        WritePublicationFormInputType
    > = async (data) => {
        try {
            const publication = WritePublicationFormAddDocSchema.parse({
                userId: auth.currentUser?.uid!,
                message: data.message,
                creationDate: new Date(Date.now()),
            });

            await addDoc(publicationsCollectionRef, publication);
        } catch (error) {
            setError('root', {
                message: 'The user log in process encountered an problem.',
            });
            console.error(error);
        }
    };

    return (
        <form onSubmit={handleSubmit(handleWritePublication)}>
            <section>
                <label htmlFor="message">Message</label>

                <p>Description of what is expected</p>

                <input
                    {...register('message')}
                    type="text"
                    name="message"
                    id="message"
                    placeholder=""
                />

                {errors.message && <p>{errors.message.message}</p>}
            </section>

            {/* IDEA: It would be interesting to not only disable the button but also have a little loading spin. */}
            {/* IDEA: It might be a good idea to create a reusable component for the submit button knowing there will be many form on this app. */}
            <section>
                <button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? `Loading...` : `Publish`}
                </button>
            </section>

            {errors.root && <p>{errors.root.message}</p>}
        </form>
    );
};

export default WritePublicationForm;
