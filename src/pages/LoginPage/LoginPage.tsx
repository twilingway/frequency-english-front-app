import { Text } from '@react-three/drei';
import { Canvas } from '@react-three/fiber'; // import s from './LoginPage.module.scss';
import { isStreamScreen } from 'playroomkit';
import { Card } from '../../shared/ui';

interface ILoginPageProps {
    className?: string;
}

export const LoginPage = ({ className }: ILoginPageProps) => {
    return (
        <div id="canvas-container">
            <Canvas
                id="three-canvas-container"
                shadows
                // camera={{
                //     position: isStreamScreen() ? [14, 10, -14] : [0, 4, 12],
                //     fov: 30,
                // }}
            >
                <color attach="background" args={['#d32626']} />
                <Text
                    // font="/fonts/RobotoSlab-Bold.ttf"
                    fontSize={1.1}
                    anchorY={'top'}
                    anchorX={'left'}
                    position-x={-0.46}
                    position-y={-0.3}
                    position-z={0.01}
                >
                    {'войти'.toUpperCase()}
                    <meshStandardMaterial
                        color="white"
                        // roughness={materials.Front.roughness}
                    />
                </Text>
                <Card />
            </Canvas>
        </div>
    );
};
