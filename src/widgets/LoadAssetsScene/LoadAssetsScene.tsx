import { Canvas } from '@react-three/fiber';
import {
    CameraShake,
    CubeCamera,
    GizmoHelper,
    GizmoViewcube,
    GizmoViewport,
    Grid,
    Loader,
    OrbitControls,
    OrthographicCamera,
    PerspectiveCamera,
    Plane,
    Stage,
    Text,
    TransformControls,
    useAnimations,
    useGLTF,
    useTexture,
} from '@react-three/drei';
import { Suspense, useEffect } from 'react';
import * as THREE from 'three';

import { Card } from '../../shared/ui';
import { Scene } from '../Scene/Scene';
import { angleToRadians } from '../../shared/utils/angle';

import s from './LoadAssetsScene.module.scss';
import { Ground } from '../Ground/Ground';
import { Car } from '../../shared/ui/Car/Car';

useGLTF.preload('/models/robot.gltf');
function Model(props) {
    const { scene, animations } = useGLTF('/models/robot-draco.glb');
    const { actions } = useAnimations(animations, scene);
    useEffect(() => {
        actions.Idle.play();
        scene.traverse(
            (obj) => obj.isMesh && (obj.receiveShadow = obj.castShadow = true),
        );
    }, [actions, scene]);
    return <primitive object={scene} {...props} />;
}

const Back = () => {
    const texture = useTexture(`/assets/images/background.webp`);

    return (
        <Plane
            args={[16, 9]}
            scale={3}
            rotation={[-Math.PI / 2, 0, 0]}
            translate={[0, 0, 0]}
        >
            <meshStandardMaterial map={texture} />
        </Plane>
    );
};

const SceneLoader = () => {
    return (
        <Canvas className={s.canvas}>
            {/* Ваша трехмерная сцена */}
            <color attach="background" args={['skyblue']} />
            <GizmoHelper alignment="bottom-right" margin={[80, 80]}>
                <GizmoViewport
                    // disabled
                    // hideNegativeAxes
                    scale={35}
                    position={[0, 80, -40]}
                />
                <GizmoViewcube opacity={0.95} />
                {/* <TransformControls /> */}
            </GizmoHelper>
            <Suspense
                fallback={
                    <Text
                        fontSize={0.2}
                        anchorY={'top'}
                        anchorX={'left'}
                        position-x={-0.5}
                        position-y={2}
                        position-z={0.01}
                        color={'red'}
                    >
                        Loading...
                    </Text>
                }
            >
                {/* <Stage
                    intensity={0.5}
                    preset="rembrandt"
                    shadows={{
                        type: 'accumulative',
                        color: 'skyblue',
                        colorBlend: 2,
                        opacity: 1,
                    }}
                    adjustCamera={3}
                    environment="sunset"
                >
                    <Model />
                </Stage> */}

                <OrbitControls
                    makeDefault
                    target={[0, 0, 0]}
                    maxPolarAngle={0}
                    minPolarAngle={1.9}
                    maxAzimuthAngle={0}
                    minAzimuthAngle={0}
                />

                <PerspectiveCamera makeDefault fov={75} position={[0, -2, 6]} />
                {/* <OrthographicCamera makeDefault position={[0, 0, 1]} /> */}

                <color args={[255, 255, 255]} attach="background" />

                {/* <OrthographicCamera
                    position={[0, 0, 0]}
                    rotation={[angleToRadians(-10), 0, 0]}
                > */}
                <Grid
                    args={[40, 40]}
                    rotation={[angleToRadians(90), 0, 0]}
                    position={[0, 0, -0.01]}
                    castShadow
                    side={THREE.DoubleSide}
                    cellColor={'green'}
                ></Grid>
                <Scene />
                {/* </OrthographicCamera> */}
                <spotLight
                    color={[255, 255, 255]}
                    intensity={1}
                    angle={0.6}
                    penumbra={0.5}
                    position={[5, 5, 10]}
                    castShadow
                    shadow-bias={-0.0001}
                />

                {/* <spotLight
                    color={[0.14, 0.5, 10]}
                    intensity={2000}
                    angle={0.6}
                    penumbra={0.5}
                    position={[-5, 5, 2]}
                    castShadow
                    shadow-bias={-0.0001}
                /> */}
                {/* <Car /> */}
                <Ground />
            </Suspense>
            <ambientLight intensity={1} />
        </Canvas>
    );
};

export default SceneLoader;

useTexture.preload('/assets/images/background.webp');
