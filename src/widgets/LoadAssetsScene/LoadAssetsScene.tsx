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

import s from './LoadAssetsScene.module.scss';
import { Card } from '../../shared/ui';
import { Scene } from '../Scene/Scene';

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

                <PerspectiveCamera
                    position={[0, 0, -4]}
                    // rotation={[Math.PI / 2.2, 0, 0]}
                >
                    <>
                        <Scene />
                        {/* <sphereGeometry />
                            <meshStandardMaterial envMap={texture} /> */}
                        {/* <Grid args={[40, 40]} /> */}
                        {/* <Plane scale={20} rotation={[-Math.PI / 2, 0, 0]} /> */}
                        {/* <Back /> */}
                        {/* <mesh
                            castShadow
                            receiveShadow
                            geometry={nodes.Plane.geometry}
                        > */}
                        {/* <meshStandardMaterial
                                // {...materials.Front}
                                map={texture}
                                color="white"
                            /> */}
                        {/* </mesh> */}

                        {/* <Card
                            scale={2}
                            position={[0, 0, 0]}
                            rotation={[0, 0, 0]}
                        />
                        <Card
                            scale={2}
                            position={[0, 0, 0]}
                            rotation={[0, 0, 0]}
                        />
                        <Card
                            scale={2}
                            position={[0, 0, 0]}
                            rotation={[0, 0, 0]}
                        />
                        <Card
                            scale={2}
                            position={[0, 0, 0]}
                            rotation={[0, 0, 0]}
                        />
                        <Card
                            scale={2}
                            position={[0, 0, 0]}
                            rotation={[0, 0, 0]}
                        />
                        <Card
                            scale={2}
                            position={[0, 0, 0]}
                            rotation={[0, 0, 0]}
                        /> */}

                        {/* <Card
                            scale={2}
                            position={[0, 0.1, 9]}
                            rotation={[-Math.PI / 2, 0, 0]}
                        /> */}
                    </>
                </PerspectiveCamera>
            </Suspense>

            <OrbitControls makeDefault />
            <ambientLight />
            {/* <pointLight position={[10, 10, 10]} /> */}
            {/* <mesh>
                <boxBufferGeometry args={[1, 1, 1]} />
                <meshStandardMaterial color="orange" />
            </mesh> */}
            {/* <Loader /> */}
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
