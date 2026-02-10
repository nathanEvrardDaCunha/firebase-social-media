import RegisterUserForm from '../component/RegisterUserForm';

const RegisterPage = () => {
    return (
        <section>
            <div>
                <h1>Sign Up</h1>
                <p>
                    Create your account to join our community of talented
                    individuals.
                </p>
            </div>

            <RegisterUserForm />
        </section>
    );
};

export default RegisterPage;
