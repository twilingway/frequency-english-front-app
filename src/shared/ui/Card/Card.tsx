import { motion } from 'framer-motion-3d';
import React, { useRef } from 'react';
import { Text } from '@react-three/drei';

export function Card({
    id,
    name,
    position,
    cardIndex,
    selectedCardIndex,
    setSelectedCardIndex,
    setDragging,
}) {
    const objRef = useRef();

    const onPointerDown = (event) => {
        if (event.button === 2) {
            // Right click
            setSelectedCardIndex(null);
            setDragging(false);
        } else {
            setSelectedCardIndex(cardIndex);
            setDragging(true);
        }
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
                    x: position[0],
                    y: position[1],
                    z: position[2],
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
                {name}
            </Text>
        </motion.group>
    );
}
