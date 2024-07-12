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
        <Canvas className={s.canvas} camera={{ position: [0, 0, 5] }}>
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

                <OrthographicCamera
                    position={[0, 0, 0]}
                    rotation={[angleToRadians(-10), 0, 0]}
                >
                    <>
                        {console.log('Suspense :>> ')}
                        {/* <sphereGeometry />
                            <meshStandardMaterial envMap={texture} /> */}
                        {/* <Plane scale={20} rotation={[-Math.PI / 2, 0, 0]} /> */}
                        {/* <Back /> */}
                    </>
                    <Grid
                        args={[40, 40]}
                        rotation={[angleToRadians(90), 0, 0]}
                        castShadow
                        side={THREE.DoubleSide}
                    ></Grid>
                    <Scene />
                </OrthographicCamera>
            </Suspense>

            <OrbitControls makeDefault />
            <ambientLight />

            {/* <CameraShake
                maxYaw={0.1} // Max amount camera can yaw in either direction
                maxPitch={0.1} // Max amount camera can pitch in either direction
                maxRoll={0.1} // Max amount camera can roll in either direction
                yawFrequency={0.1} // Frequency of the the yaw rotation
                pitchFrequency={0.1} // Frequency of the pitch rotation
                rollFrequency={0.1} // Frequency of the roll rotation
                intensity={1} // initial intensity of the shake
                decayRate={0.65} // if decay = true this is the rate at which intensity will reduce at />
            /> */}
        </Canvas>
    );
};

export default SceneLoader;

useTexture.preload('/assets/images/background.webp');
