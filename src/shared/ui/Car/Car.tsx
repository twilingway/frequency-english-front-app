import { useLoader } from '@react-three/fiber';
import { useEffect } from 'react';
import { Mesh } from 'three';

import { GLTFLoader } from 'three/examples/jsm/Addons.js';

export const Car = () => {
    const gltf = useLoader(GLTFLoader, '/models/car/scene.gltf');

    useEffect(() => {
        gltf.scene.scale.set(0.005, 0.005, 0.005);
        gltf.scene.position.set(0, -0.035, 0);
        gltf.scene.traverse((child) => {
            if (child instanceof Mesh) {
                child.castShadow = true;
                child.receiveShadow = true;
                child.material.envMapIntensity = 20;
            }
        });
    }, [gltf]);

    return <primitive object={gltf.scene} />;
};
