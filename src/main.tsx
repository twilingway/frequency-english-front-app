import { insertCoin } from 'playroomkit';
import React from 'react';
import { createRoot } from 'react-dom/client';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { registerSW } from 'virtual:pwa-register';

import App from './App.tsx';

import './index.css';
import { GameEngineProvider } from './shared/hooks/useGameEngine.tsx';
import { LoginPage } from './pages/LoginPage/LoginPage';

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
        element: <LoginPage />,
    },
    // {
    //     path: '/game',
    //     element: insertCoin({ streamMode: false }).then(() => {
    //         <App />;
    //     }),
    // },
]);

const rootElement = document.getElementById('root');
if (rootElement) {
    createRoot(rootElement).render(
        <React.StrictMode>
            {/* <div>123</div> */}
            <GameEngineProvider>
                {/* <App /> */}
                <RouterProvider router={router} />
            </GameEngineProvider>
        </React.StrictMode>,
    );
} else {
    console.error('Element with id "root" not found.');
}
