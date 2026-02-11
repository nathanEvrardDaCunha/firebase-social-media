import { createBrowserRouter, RouterProvider } from 'react-router';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import FeedPage from './pages/FeedPage';
import HomePage from './pages/HomePage';

// TODO: Implement routes with tanstack-router or react-router.

// TODO: Implement anti-slur algorithm to automatically flag/report and delete problematic message and post (with or without documents).

// TODO: Standardize path by going from relative to absolute path.

const router = createBrowserRouter([
    { path: '/', element: <HomePage /> },
    { path: '/sign-up', element: <RegisterPage /> },
    { path: '/sign-in', element: <LoginPage /> },
    { path: '/feed', element: <FeedPage /> },
]);

function App() {
    return <RouterProvider router={router} />;
}

export default App;
