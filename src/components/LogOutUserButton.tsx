import { Link } from 'react-router';
import { auth } from '../config/firebase-config';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { useEffect, useState } from 'react';

// TODO: Go back to first page
// TODO: Will have to display the error message properly.

const LogOutUserButton = () => {
    const [user, setUser] = useState(auth.currentUser);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUser(user);
        });

        return () => unsubscribe();
    }, []);

    const handleLogOutUser: React.MouseEventHandler<
        HTMLButtonElement
    > = async () => {
        try {
            await signOut(auth);
        } catch (error) {
            console.error(error);
        }
    };

    return user ? (
        <button type="button" onClick={handleLogOutUser}>
            Log Out
        </button>
    ) : (
        <section>
            <Link to={'/sign-in'}>Sign-In</Link>
            <Link to={'/sign-up'}>Sign-Up</Link>
        </section>
    );
};

export default LogOutUserButton;
