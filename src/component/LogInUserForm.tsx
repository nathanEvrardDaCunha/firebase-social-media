// IDEA: Maybe rename the features to:
// - LogOutUser => SignOutUser
// - RegisterUser => SignUpUser
// - LogInUser => SignInUser

import { zodResolver } from '@hookform/resolvers/zod';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useForm, type SubmitHandler } from 'react-hook-form';
import z from 'zod';
import { auth } from '../config/firebase-config';

// TODO: Make sure user cannot log in if he hasn't log out first.

// IDEA: Regroup FormFieldsSchema and FormFields from here and "RegisterUserForm" into one file ?
// TODO: Replace the magic number by CONSTANT like MIN_PASSWORD_LENGTH.
//const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
//const MIN_PASSWORD_LENGTH = 12;
//const MAX_PASSWORD_LENGTH = 100;
const FormFieldsSchema = z.object({
    email: z.email(),
    password: z.string().min(12).max(100),
});

// IDEA: Might be moved to dedicated types folder
type FormFields = z.infer<typeof FormFieldsSchema>;

// IDEA: Go take a look at these articles to make a really beautiful yet ergonomic interface (https://www.uidesign.tips/ui-tips/social-login - https://www.uidesign.tips/blog/top-ui-ux-design-tips-for-better-forms).
// IDEA: Check how to enforce the same form validation on Firebase because client-side is unsecure.
const LogInUserForm = () => {
    const {
        register,
        handleSubmit,
        setError,
        formState: { errors, isSubmitting },
    } = useForm<FormFields>({
        resolver: zodResolver(FormFieldsSchema),
    });

    const handleLogInUser: SubmitHandler<FormFields> = async (data) => {
        // IDEA: Add setTimeout of 1 second to make the user "feel" the backend is "processing" (psychologic trick).
        try {
            // TODO: GO to account page.
            await signInWithEmailAndPassword(auth, data.email, data.password);
        } catch (error) {
            setError('root', {
                message: 'The user log in process encountered an problem.',
            });
            console.error(error);
        }
    };

    // TODO: Change placeholders
    return (
        <form onSubmit={handleSubmit(handleLogInUser)}>
            <section>
                <label htmlFor="email">Label 1</label>

                <p>Description of what is expected</p>

                <input
                    {...register('email')}
                    type="text"
                    name="email"
                    id="email"
                    placeholder=""
                />

                {errors.email && <p>{errors.email.message}</p>}
            </section>

            <section>
                <label htmlFor="password">Label 2</label>

                <p>Description of what is expected</p>

                <input
                    {...register('password')}
                    type="password"
                    name="password"
                    id="password"
                    placeholder=""
                />

                {errors.password && <p>{errors.password.message}</p>}
            </section>

            {/* IDEA: It would be interesting to not only disable the button but also have a little loading spin. */}
            {/* IDEA: It might be a good idea to create a reusable component for the submit button knowing there will be many form on this app. */}
            <section>
                <button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? `Loading...` : `Log In Account`}
                </button>

                <a href="http://register">Go to Register</a>
            </section>

            {errors.root && <p>{errors.root.message}</p>}
        </form>
    );
};

export default LogInUserForm;
