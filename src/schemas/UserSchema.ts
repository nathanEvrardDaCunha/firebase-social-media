// IDEA: Regroup FormFieldsSchema and FormFields from here and "RegisterUserForm" into one file ?

import z from 'zod';

// TODO: Replace the magic number by CONSTANT like MIN_PASSWORD_LENGTH.
//const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
//const MIN_PASSWORD_LENGTH = 12;
//const MAX_PASSWORD_LENGTH = 100;

export const UserSchema = z.object({
    email: z.email(),
    password: z.string().min(12).max(100),
});

export type UserFields = z.infer<typeof UserSchema>;
