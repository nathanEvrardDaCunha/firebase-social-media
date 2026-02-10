import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { z } from 'zod';

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

const RegisterUserForm = () => {
    // IDEA: Go take a look at these articles to make a really beautiful yet ergonomic interface (https://www.uidesign.tips/ui-tips/social-login - https://www.uidesign.tips/blog/top-ui-ux-design-tips-for-better-forms).

    // IDEA: Check how to enforce the same form validation on Firebase because client-side is unsecure.

    const {
        register,
        handleSubmit,
        setError,
        formState: { errors, isSubmitting },
    } = useForm<FormFields>({
        defaultValues: {
            email: 'default-email',
            password: 'default-password',
        },
        resolver: zodResolver(FormFieldsSchema),
    });

    const onSubmitForm: SubmitHandler<FormFields> = async (data) => {
        try {
            // IDEA: Purposefully make the form take at least one so user "feel" like the backend is correctly working (psychologic trick I heard once).
            await new Promise((resolve) => setTimeout(resolve, 2000));

            throw new Error();

            console.log(data);
        } catch (error) {
            setError('root', {
                message: 'The user creation encountered an problem.',
            });
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmitForm)}>
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
