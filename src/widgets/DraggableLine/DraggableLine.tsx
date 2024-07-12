import { Line, Plane, Text } from '@react-three/drei';
import { useThree } from '@react-three/fiber';
import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { motion } from 'framer-motion-3d';

const LINE_LENGTH = 10;
const MAX_OBJECTS = 9;
const SPACING = LINE_LENGTH / (MAX_OBJECTS + 1);

export function DraggableLine({
    position,
    objects,
    addObject,
    dragging,
    selectedCardIndex,
    setLineObjects,
}) {
    const lineRef = useRef();
    const { camera, gl } = useThree();
    const raycaster = useRef(new THREE.Raycaster());
    const mouse = useRef(new THREE.Vector2());
    const [highlightedIndex, setHighlightedIndex] = useState(null);

    const onPointerMove = (event) => {
        if (!dragging) return;
        mouse.current.set(
            (event.clientX / window.innerWidth) * 2 - 1,
            -(event.clientY / window.innerHeight) * 2 + 1,
        );
        raycaster.current.setFromCamera(mouse.current, camera);
        const intersects = raycaster.current.intersectObject(lineRef.current);
        if (intersects.length > 0) {
            const intersect = intersects[0];
            const xPos = intersect.point.x;
            let closestIndex = objects.length;
            for (let i = 0; i < objects.length; i++) {
                if (xPos < objects[i].position[0]) {
                    closestIndex = i;
                    break;
                }
            }
            setHighlightedIndex(closestIndex);
        } else {
            setHighlightedIndex(null);
        }
    };

    const onPointerDown = (event) => {
        if (
            event.button === 0 &&
            highlightedIndex !== null &&
            selectedCardIndex !== null
        ) {
            addObject(highlightedIndex, selectedCardIndex);
            setHighlightedIndex(null);
        }
    };

    useEffect(() => {
        gl.domElement.addEventListener('pointermove', onPointerMove);
        gl.domElement.addEventListener('pointerdown', onPointerDown);
        return () => {
            gl.domElement.removeEventListener('pointermove', onPointerMove);
            gl.domElement.removeEventListener('pointerdown', onPointerDown);
        };
    }, [gl.domElement, dragging, highlightedIndex, selectedCardIndex]);

    useEffect(() => {
        // Center objects on the line
        const totalObjects = objects.length;
        const spacing = LINE_LENGTH / (totalObjects + 1);
        const updatedObjects = objects.map((obj, index) => ({
            ...obj,
            position: [
                -LINE_LENGTH / 2 + spacing * (index + 1),
                0.25,
                obj.position[2],
            ],
        }));
        setLineObjects(updatedObjects);
    }, [objects, setLineObjects]);

    return (
        <group position={position}>
            <Plane ref={lineRef} args={[LINE_LENGTH, 1]} rotation={[0, 0, 0]}>
                <meshStandardMaterial color="lightgrey" />
            </Plane>
            {objects.map((obj, index) => (
                <motion.group key={obj.id}>
                    <motion.mesh
                        position={obj.position}
                        animate={{
                            x: obj.position[0],
                            y: obj.position[1],
                            z: obj.position[2],
                        }}
                        transition={{
                            type: 'spring',
                            stiffness: 100,
                            damping: 10,
                        }}
                    >
                        <boxGeometry args={[0.5, 0.5, 0.5]} />
                        <meshStandardMaterial color="blue" />
                    </motion.mesh>
                    <Text
                        position={[
                            obj.position[0],
                            obj.position[1] + 0.6,
                            obj.position[2],
                        ]}
                        fontSize={0.2}
                        color="black"
                        anchorX="center"
                        anchorY="middle"
                    >
                        {obj.name}
                    </Text>
                </motion.group>
            ))}
            {Array.from({ length: objects.length + 1 }).map((_, index) => {
                let xPos;
                if (index === 0) {
                    xPos =
                        objects.length > 0
                            ? objects[0].position[0] - SPACING
                            : 0;
                } else if (index === objects.length) {
                    xPos =
                        objects.length > 0
                            ? objects[objects.length - 1].position[0] + SPACING
                            : 0;
                } else {
                    xPos =
                        (objects[index - 1].position[0] +
                            objects[index].position[0]) /
                        2;
                }
                const isOccupied = objects.some(
                    (obj) => Math.abs(obj.position[0] - xPos) < SPACING / 2,
                );
                return (
                    <mesh
                        key={index}
                        position={[xPos, 0.01, 0]}
                        visible={dragging && !isOccupied}
                    >
                        <boxGeometry args={[0.5, 0.5, 0.01]} />
                        <meshStandardMaterial
                            color={
                                highlightedIndex === index
                                    ? 'yellow'
                                    : 'lightgrey'
                            }
                            opacity={0.5}
                            transparent
                        />
                    </mesh>
                );
            })}
        </group>
    );
}
