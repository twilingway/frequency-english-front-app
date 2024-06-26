import ReactDOM from 'react-dom/client';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { registerSW } from 'virtual:pwa-register';

import App from './App.tsx';

import './index.css';

// add this to prompt for a refresh
const updateSW = registerSW({
    onNeedRefresh() {
        if (confirm('New content available. Reload?')) {
            updateSW(true);
        }
    },
});

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
    },
    // {
    //     path: '/login',
    //     element: <LoginPage />,
    // },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
    <RouterProvider router={router} />,
);
