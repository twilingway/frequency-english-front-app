// import { DBConfig } from './app/db/DBConfig';
// import { initDB } from 'react-indexed-db-hook';
// import MyStepsComponent from './features/MyStepsComponent/MyStepsComponent';
import { Canvas } from '@react-three/fiber';
import { Suspense, useCallback, useEffect, useState } from 'react';
import useTelegram from './shared/hooks/useTelegram';
import { Tree, UserInterface } from './entities';

import './App.css';
import { Leva } from 'leva';
import { isHost, isStreamScreen } from 'playroomkit';
import { Experience } from './shared/ui/Experience/Experience';
import SceneLoader from './widgets/LoadAssetsScene/LoadAssetsScene';

// initDB(DBConfig);

const DEBUG = true;

function App() {
    const { tg, onToggleButton } = useTelegram();
    const [value, setValue] = useState('');

    const onSendData = useCallback(() => {
        console.log('onSendData :>> ');

        // eslint-disable-next-line no-debugger

        const data = {
            value,
        };
        try {
            tg.sendData(JSON.stringify(data));
            Telegram.WebApp.sendData(JSON.stringify(data));
            console.log('TRUE :>> ');
        } catch (error) {
            console.log('error :>> ', error);
        }
        alert(JSON.stringify(data));
    }, [tg, value]);

    useEffect(() => {
        tg.ready();
        tg.MainButton.setParams({
            text: 'Заказать2',
        });
        tg.onEvent('mainButtonClicked', onSendData);
        return () => {
            tg.offEvent('mainButtonClicked', onSendData);
        };
    }, [onSendData, tg]);

    const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value);
    };

    return (
        <>
            {/* <Leva hidden={!DEBUG || !isHost()} /> */}
            <SceneLoader />
            {/* <Canvas
                id="three-canvas-container"
                shadows
                camera={{
                    position: isStreamScreen() ? [14, 10, -14] : [0, 4, 12],
                    fov: 30,
                }}
            >
                <color attach="background" args={['#ececec']} />               
                <Experience />
            </Canvas> */}
            {/* <UserInterface /> */}
            {/* <button onClick={onToggleButton}>toogle</button>
            <button onClick={onSendData}>SEND</button>
            <input type="text" value={value} onChange={handleNameChange} /> */}
        </>
    );
}

export default App;
