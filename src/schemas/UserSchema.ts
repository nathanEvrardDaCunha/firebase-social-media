import z from 'zod';

const MIN_PASSWORD = 12;
const MAX_PASSWORD = 100;

// IDEA: Maybe rewrite the error message to be clearer for users ?
export const UserSchema = z.object({
    email: z.email(),
    password: z.string().min(MIN_PASSWORD).max(MAX_PASSWORD),
});

export type UserFields = z.infer<typeof UserSchema>;
