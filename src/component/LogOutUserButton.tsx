import { auth } from '../config/firebase-config';
import { signOut } from 'firebase/auth';

const handleLogOutUser: React.MouseEventHandler<
    HTMLButtonElement
> = async () => {
    try {
        // TODO: Go back to first page
        await signOut(auth);
    } catch (error) {
        // setError('root', {
        //     message: 'The user sign-out process encountered an problem.',
        // });
        // TODO: Will have to display the error message properly.
        console.error(error);
    }
};

const LogOutUserButton = () => {
    return (
        <button type="button" onClick={handleLogOutUser}>
            Log Out
        </button>
    );
};

export default LogOutUserButton;
