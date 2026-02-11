import { Timestamp } from 'firebase/firestore';
import z from 'zod';

const MIN_MESSAGE = 1;
const MAX_MESSAGE = 400;

// IDEA: Maybe rewrite the error message to be clearer for users ?

const dateToFirebaseTimestamp = z.preprocess(
    (val) => (val instanceof Timestamp ? val.toDate() : val),
    z.instanceof(Date)
);

// TODO: Add link to Document afterward.
// IDEA: ADd tag system afterward ?
export const PublicationSchema = z.object({
    id: z.string(),
    userId: z.string(),
    message: z.string().min(MIN_MESSAGE).max(MAX_MESSAGE),
    creationDate: dateToFirebaseTimestamp,
});

export type PublicationFields = z.infer<typeof PublicationSchema>;

// ================================ //

// TODO: Refactor every schema to:
// - have one base (like PublicationSchema) but never export it
// - only export variant which are picked, egal, or modified at best

// Firestore (database) ; WriteForm (input) ; Doc (addDoc)

// Database (Get ?)

// WriteForm (Post ?)

export const WritePublicationFormInputSchema = PublicationSchema.pick({
    message: true,
});

export type WritePublicationFormInputType = z.infer<
    typeof WritePublicationFormInputSchema
>;

export const WritePublicationFormAddDocSchema = PublicationSchema.omit({
    id: true,
});

export type WritePublicationFormAddDocType = z.infer<
    typeof WritePublicationFormAddDocSchema
>;
