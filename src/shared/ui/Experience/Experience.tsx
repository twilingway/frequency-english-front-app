import { Environment, OrbitControls, Stats } from '@react-three/drei';
import { MobileController } from '../../../entities';
import { degToRad } from 'three/src/math/MathUtils.js';
import { Card } from '../Card/Card';
import { isStreamScreen } from 'playroomkit';
import { GameBoard } from '../../../entities/GameBoard/GameBoard';

export const Experience = () => {
    return (
        <>
            <OrbitControls maxPolarAngle={degToRad(80)} />
            {isStreamScreen() ? <GameBoard /> : <MobileController />}
            {/* <Loader /> */}

            {/* <Character />
            <Character character={1} position-x={-2} /> */}
            {/* <Card />
            <Card position-x={-2} /> */}
            {/* <Card position-x={2} /> */}
            <Environment preset="dawn" background backgroundBlurriness={1} />
        </>
    );
};
