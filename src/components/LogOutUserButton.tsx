import { auth } from '../config/firebase-config';
import { signOut } from 'firebase/auth';

// TODO: Go back to first page
// TODO: Will have to display the error message properly.

const handleLogOutUser: React.MouseEventHandler<
    HTMLButtonElement
> = async () => {
    try {
        await signOut(auth);
    } catch (error) {
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
