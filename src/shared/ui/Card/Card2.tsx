// import {
//     Text,
//     TransformControls,
//     useFont,
//     useGLTF,
//     useTexture,
// } from '@react-three/drei';
// import React, { useEffect, useRef, useState } from 'react';
// import { angleToRadians } from '../../utils/angle';
// import { useFrame, useThree } from '@react-three/fiber';

// import * as THREE from 'three';

// const CARD_DESCRIPTIONS = {
//     // punch: 'Punch another pirate and make it drop a gem',
//     // shield: 'Protect yourself from an attack',
//     // grab: 'Grab a gem from the treasure. If no gem is left, you get nothing',
//     quickly: 'Punch another pirate and make it drop a gem',
// };
import { motion } from 'framer-motion-3d';
import React, { useRef } from 'react';
import { Text } from '@react-three/drei';

export function Card({
    position,
    cardIndex,
    selectedCardIndex,
    setSelectedCardIndex,
    setDragging,
}) {
    const objRef = useRef();

    const onPointerDown = (event) => {
        setSelectedCardIndex(cardIndex);
        setDragging(true);
        event.stopPropagation();
    };

    return (
        <motion.group>
            <motion.mesh
                ref={objRef}
                position={position}
                onPointerDown={onPointerDown}
                scale={selectedCardIndex === cardIndex ? 1.2 : 1}
                animate={{
                    position: position,
                    scale: selectedCardIndex === cardIndex ? 1.2 : 1,
                }}
                transition={{
                    type: 'spring',
                    stiffness: 100,
                    damping: 10,
                }}
            >
                <boxGeometry args={[0.5, 0.5, 0.5]} />
                <meshStandardMaterial
                    color={selectedCardIndex === cardIndex ? 'red' : 'blue'}
                />
            </motion.mesh>
            <Text
                position={[position[0], position[1] + 0.6, position[2]]}
                fontSize={0.2}
                color="black"
                anchorX="center"
                anchorY="middle"
            >
                {cardIndex}
            </Text>
        </motion.group>
    );
}

// export function Card({
//     type = 'quickly',
//     position,
//     setPosition,
//     setDragging,
//     ...props
// }) {
//     const { nodes, materials } = useGLTF('/models/card.glb');
//     const texture = useTexture(`/assets/images/cards/${type}.png`);
//     const back = useTexture(`/assets/images/shirts/shirt.png`);
//     // texture.flipY = false;

//     const objRef = useRef();
//     const { camera, gl } = useThree();
//     const raycaster = useRef(new THREE.Raycaster());
//     const mouse = useRef(new THREE.Vector2());
//     const [isDragging, setIsDragging] = useState(false);
//     const offset = useRef(new THREE.Vector3());
//     const intersectionPlane = useRef(
//         new THREE.Plane(new THREE.Vector3(0, 1, 0), 0),
//     );
//     const planeIntersect = useRef(new THREE.Vector3());

//     const onPointerDown = (event) => {
//         mouse.current.set(
//             (event.clientX / window.innerWidth) * 2 - 1,
//             -(event.clientY / window.innerHeight) * 2 + 1,
//         );
//         raycaster.current.setFromCamera(mouse.current, camera);
//         const intersects = raycaster.current.intersectObject(objRef.current);

//         if (intersects.length > 0) {
//             setIsDragging(true);
//             setDragging(true);
//             const intersect = intersects[0];
//             offset.current.copy(intersect.point).sub(objRef.current.position);
//             intersectionPlane.current.setFromNormalAndCoplanarPoint(
//                 camera.getWorldDirection(new THREE.Vector3()).negate(),
//                 intersect.point,
//             );
//         }
//         event.stopPropagation();
//     };

//     const onPointerMove = (event) => {
//         if (!isDragging) return;
//         mouse.current.set(
//             (event.clientX / window.innerWidth) * 2 - 1,
//             -(event.clientY / window.innerHeight) * 2 + 1,
//         );
//     };

//     const onPointerUp = () => {
//         setIsDragging(false);
//         setDragging(false);
//     };

//     useEffect(() => {
//         gl.domElement.addEventListener('pointermove', onPointerMove);
//         gl.domElement.addEventListener('pointerup', onPointerUp);
//         return () => {
//             gl.domElement.removeEventListener('pointermove', onPointerMove);
//             gl.domElement.removeEventListener('pointerup', onPointerUp);
//         };
//     }, [gl.domElement]);

//     useFrame(() => {
//         if (isDragging) {
//             raycaster.current.setFromCamera(mouse.current, camera);
//             if (
//                 raycaster.current.ray.intersectPlane(
//                     intersectionPlane.current,
//                     planeIntersect.current,
//                 )
//             ) {
//                 setPosition(
//                     planeIntersect.current.sub(offset.current).toArray(),
//                 );
//             }
//         }
//     });

//     return (
//         <mesh ref={objRef} position={position} onPointerDown={onPointerDown}>
//             <boxGeometry args={[0.5, 0.5, 0.5]} />
//             <meshStandardMaterial color="blue" />
//         </mesh>
//     );
//     return (
//         <group
//             {...props}
//             dispose={null}
//             ref={objRef}
//             // position={[0, 0, 0]}
//             onPointerDown={onPointerDown}
//         >
//             <mesh castShadow receiveShadow geometry={nodes.Plane.geometry}>
//                 <meshStandardMaterial
//                     {...materials.Front}
//                     map={texture}
//                     color="white"
//                 />
//             </mesh>
//             <mesh
//                 castShadow
//                 receiveShadow
//                 geometry={nodes.Plane_1.geometry}
//                 material={materials.Borders}
//             />
//             {/* <mesh
//                 castShadow
//                 receiveShadow
//                 geometry={nodes.Plane_2.geometry}
//                 material={materials.Back}
//             /> */}
//             <mesh
//                 castShadow
//                 receiveShadow
//                 geometry={nodes.Plane_2.geometry}
//                 // material={materials.Back}
//             >
//                 <meshStandardMaterial
//                     {...materials.Back}
//                     map={back}
//                     color="white"
//                 />
//             </mesh>
//             <Text
//                 // font="/fonts/RobotoSlab-Bold.ttf"
//                 fontSize={0.1}
//                 anchorY={'top'}
//                 anchorX={'left'}
//                 position-x={-0.42}
//                 position-y={0.65}
//                 position-z={0.01}
//             >
//                 {10}
//                 <meshStandardMaterial
//                     color="red"
//                     roughness={materials.Front.roughness}
//                 />
//             </Text>
//             <Text
//                 // font="/fonts/RobotoSlab-Bold.ttf"
//                 fontSize={0.1}
//                 anchorY={'top'}
//                 anchorX={'left'}
//                 position-x={-0.46}
//                 position-y={-0.3}
//                 position-z={0.01}
//             >
//                 {type.toUpperCase()}
//                 <meshStandardMaterial
//                     color="white"
//                     roughness={materials.Front.roughness}
//                 />
//             </Text>
//             <Text
//                 // font="/fonts/RobotoSlab-Regular.ttf"
//                 fontSize={0.06}
//                 maxWidth={0.9}
//                 anchorY={'top'}
//                 anchorX={'left'}
//                 position-x={-0.46}
//                 position-y={-0.44}
//                 position-z={0.01}
//                 lineHeight={1}
//             >
//                 {CARD_DESCRIPTIONS[type] || ''}
//                 <meshStandardMaterial
//                     color="white"
//                     roughness={materials.Front.roughness}
//                 />
//             </Text>
//         </group>
//     );
// }

// useGLTF.preload('/models/card.glb');
// useTexture.preload('/assets/images/cards/quickly.png');
// useFont.preload('/fonts/RobotoSlab-Bold.ttf');
// useFont.preload('/fonts/RobotoSlab-Regular.ttf');
