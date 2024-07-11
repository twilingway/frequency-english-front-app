import {
    Environment,
    OrbitControls,
    PerspectiveCamera,
} from '@react-three/drei';
import { angleToRadians } from '../../shared/utils/angle';
// import { useFrame } from '@react-three/fiber';
import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export const Tree = () => {
    const orbitControlsRef = useRef(null);

    // useFrame((state) => {
    //     // state.pointer
    //     // console.log(
    //     //     'orbitControlsRef.current :>> ',
    //     //     orbitControlsRef?.current?.zoom0,
    //     // );
    // });
    useEffect(() => {
        console.log('orbitControlsRef.current :>> ', orbitControlsRef.current);
    }, [orbitControlsRef]);
    return (
        <>
            {/* Camera */}
            <PerspectiveCamera makeDefault position={[0, 1, 5]} />
            <OrbitControls
                ref={orbitControlsRef}
                enableZoom={true}
                minZoom={0}
                maxZoom={2}
                enablePan={false}
                // enableRotate={false}
                // zoomToCursor={true}
                // enableDamping={false}
            />

            {/* Ball */}
            <mesh position={[0, 0.5, 0]} castShadow>
                <sphereGeometry args={[0.5, 32, 32]} />
                <meshStandardMaterial
                    color="#ffffff"
                    metalness={0.6}
                    roughness={0.4}
                />
            </mesh>
            {/* Floor */}
            <mesh rotation={[-angleToRadians(90), 0, 0]} receiveShadow>
                <planeGeometry args={[200, 200]} />
                <meshStandardMaterial color="#99c9de" />
            </mesh>
            {/* Ambient Light */}
            <ambientLight args={['#ffffff', 0.25]} />
            {/* <directionalLight
                color={'#ffffff'}
                intensity={1}
                position={[-2, 4, 0]}
            /> */}

            {/* <pointLight color={'#ffffff'} intensity={1} position={[-3, 1, 0]} /> */}
            <spotLight
                args={['#ffffff', 3, 7, angleToRadians(45), 0.4]}
                position={[-3, 2, 0]}
                castShadow
            />

            <Environment background>
                <mesh>
                    <sphereGeometry args={[50, 100, 100]} />
                    <meshBasicMaterial color="#ffffff" side={THREE.BackSide} />
                </mesh>
            </Environment>
        </>
    );
};
