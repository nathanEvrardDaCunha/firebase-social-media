import LogOutUserButton from './components/LogOutUserButton';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

// TODO: Implement routes with tanstack-router or react-router.

// TODO: Implement anti-slur algorithm to automatically flag/report and delete problematic message and post (with or without documents).

// TODO: Standardize path by going from relative to absolute path.

function App() {
    return (
        <>
            <RegisterPage />

            <LogOutUserButton />

            <LoginPage />
        </>
    );
}

export default App;
