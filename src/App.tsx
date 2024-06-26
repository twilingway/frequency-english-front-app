import { DBConfig } from './app/db/DBConfig';
import { initDB } from 'react-indexed-db-hook';
import MyStepsComponent from './features/MyStepsComponent/MyStepsComponent';

import './App.css';
import ReloadPrompt from './features/ReloadPrompt/ReloadPrompt';

initDB(DBConfig);

function App() {
    return (
        <>
            <ReloadPrompt />
            <MyStepsComponent />
        </>
    );
}

export default App;
