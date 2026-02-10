import LogInUserForm from '../component/LogInUserForm';

const LoginPage = () => {
    return (
        <section>
            <div>
                <h1>Sign In</h1>
                <p>
                    Log in your account to join our community of talented
                    individuals.
                </p>
            </div>

            <LogInUserForm />
        </section>
    );
};

export default LoginPage;
