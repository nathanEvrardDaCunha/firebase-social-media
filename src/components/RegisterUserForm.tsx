import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { auth } from '../config/firebase-config';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { UserSchema, type UserFields } from '../schemas/UserSchema';

// TODO: Make sure user cannot create new account if he hasn't log out first.
// IDEA: Go take a look at these articles to make a really beautiful yet ergonomic interface (https://www.uidesign.tips/ui-tips/social-login - https://www.uidesign.tips/blog/top-ui-ux-design-tips-for-better-forms).
// IDEA: Check how to enforce the same form validation on Firebase because client-side is unsecure.
// IDEA: Add setTimeout of 1 second to make the user "feel" the backend is "processing" (psychologic trick).
// TODO: GO to login page when accoutn created.
// TODO: Change placeholders
// NEED TO TEST IF ERROR DISPLAY "USER ALREADY CREATED"

const RegisterUserForm = () => {
    const {
        register,
        handleSubmit,
        setError,
        formState: { errors, isSubmitting },
    } = useForm<UserFields>({
        resolver: zodResolver(UserSchema),
    });

    const handleRegisterUser: SubmitHandler<UserFields> = async (data) => {
        try {
            await createUserWithEmailAndPassword(
                auth,
                data.email,
                data.password
            );
        } catch (error) {
            setError('root', {
                message: 'The user creation process encountered an problem.',
            });
            console.error(error);
        }
    };

    return (
        <form onSubmit={handleSubmit(handleRegisterUser)}>
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
                    {isSubmitting ? `Loading...` : `Create Account`}
                </button>

                <a href="http://login">Go to login</a>
            </section>

            {errors.root && <p>{errors.root.message}</p>}
        </form>
    );
};

export default RegisterUserForm;
