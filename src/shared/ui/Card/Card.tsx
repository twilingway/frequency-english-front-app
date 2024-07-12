import { motion } from 'framer-motion-3d';
import React, { useRef } from 'react';
import { Text } from '@react-three/drei';
import { ThreeEvent, Vector3 } from '@react-three/fiber';
import { Euler } from 'three';
import { MotionValueVector3 } from '@react-three/drei';

interface ICardProps {
    name: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    position?: any;

    cardIndex: number;
    selectedCardIndex: number | null;
    setSelectedCardIndex: (index: number | null) => void;
    setDragging: (isDragging: boolean) => void;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    rotation?: any;
    setHoverCardIndex: (index: number | null) => void;
    hoverCardIndex: number | null;
}

export function Card({
    name,
    position = [0, 0, 0],
    cardIndex,
    selectedCardIndex,
    setSelectedCardIndex,
    setDragging,
    rotation = [0, 0, 0],
    setHoverCardIndex,
    hoverCardIndex,
}: ICardProps) {
    const objRef = useRef(null);

    const onPointerDown = (event: ThreeEvent<PointerEvent>) => {
        if (event.button === 2) {
            // Right click

            setSelectedCardIndex(null);
            setDragging(false);
        } else {
            setSelectedCardIndex(cardIndex);
            setDragging(true);
        }
        setHoverCardIndex(null);
        event.stopPropagation();
    };

    const onHoverEnter = (event: ThreeEvent<PointerEvent>) => {
        if (!selectedCardIndex) {
            setHoverCardIndex(cardIndex);
        }
        // if (event.button === 2) {
        //     // Right click
        //     setSelectedCardIndex(null);
        //     setDragging(false);
        // } else {
        //     setSelectedCardIndex(cardIndex);
        //     setDragging(true);
        // }
        event.stopPropagation();
    };
    console.log('Card :>> ', hoverCardIndex === cardIndex);
    console.log('selectedCardIndex :>> ', selectedCardIndex);
    return (
        <motion.group>
            <motion.mesh
                ref={objRef}
                // position={position}
                onPointerDown={onPointerDown}
                // onPointerEnter={onHoverEnter}
                // onPointerOver={onHoverEnter}
                // onHoverEnd={() => setHoverCardIndex(null)}
                onPointerMove={onHoverEnter}
                onPointerLeave={() => setHoverCardIndex(null)}
                // onPointerOut={() => setHoverCardIndex(null)}
                scale={selectedCardIndex === cardIndex ? 1.2 : 1}
                position={
                    hoverCardIndex === cardIndex ||
                    selectedCardIndex === cardIndex
                        ? [0, 0, 0]
                        : position
                }
                rotation={
                    hoverCardIndex === cardIndex ||
                    selectedCardIndex === cardIndex
                        ? rotation
                        : [0, 0, 0]
                }
                animate={{
                    x: 0,
                    y:
                        hoverCardIndex === cardIndex ||
                        selectedCardIndex === cardIndex
                            ? 0.2
                            : 0,
                    z:
                        hoverCardIndex === cardIndex ||
                        selectedCardIndex === cardIndex
                            ? 0.11
                            : 0,
                    scale: selectedCardIndex === cardIndex ? 1.2 : 1,
                }}
                transition={{
                    type: 'spring',
                    stiffness: 100,
                    damping: 10,
                }}
            >
                <boxGeometry args={[0.768, 1.024, 0.02]} />
                <meshStandardMaterial
                    color={
                        selectedCardIndex === cardIndex ||
                        hoverCardIndex === cardIndex
                            ? 'red'
                            : 'blue'
                    }
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
