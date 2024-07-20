import { motion } from 'framer-motion-3d';
import React, { useRef } from 'react';
import { Text } from '@react-three/drei';
import { ThreeEvent } from '@react-three/fiber';
import { Euler, Object3D, Vector3 } from 'three';
import { MotionValueVector3 } from '@react-three/drei';
import { ICard } from '../../../store/slices/playerSlice';

interface ICardProps {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    position?: any;
    card: ICard;
    // cardIndex: number;
    selectedCard: ICard | null;
    setSelectedCard: (card: ICard | null) => void;
    // setDragging: (isDragging: boolean) => void;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    rotation?: any;
    setHoverCard: (card: ICard | null) => void;
    hoverCard: ICard | null;
}

export function Card({
    position = [0, 0, 0],
    // cardIndex,
    selectedCard,
    setSelectedCard,
    // setDragging,
    rotation = [0, 0, 0],
    setHoverCard,
    hoverCard,
    card,
}: ICardProps) {
    const objRef = useRef<Object3D>(null);

    const onPointerDown = (event: ThreeEvent<PointerEvent>) => {
        console.log('eventCard :>> ', event);
        if (objRef.current) {
            const worldPosition = new Vector3();
            const objectPosition =
                objRef.current.getWorldPosition(worldPosition);
            console.log('World position:', worldPosition);
            console.log('Object position:', objectPosition);
        }
        if (event.button === 2) {
            // Right click

            setSelectedCard(null);
            // setDragging(false);
        } else {
            setSelectedCard(card);
            // setDragging(true);
        }
        setHoverCard(null);
        event.stopPropagation();
    };

    const onHoverEnter = (event: ThreeEvent<PointerEvent>) => {
        if (!selectedCard) {
            setHoverCard(card);
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
    // console.log('Card :>> ', hoverCard?.id === card.id);
    // console.log('selectedCardIndex :>> ', selectedCard);
    return (
        <motion.group>
            <motion.mesh
                ref={objRef}
                onPointerDown={onPointerDown}
                onPointerMove={onHoverEnter}
                onPointerLeave={() => setHoverCard(null)}
                scale={selectedCard?.id === card.id ? 1.2 : 1}
                position={
                    hoverCard?.id === card.id || selectedCard?.id === card.id
                        ? [0, 0, 0]
                        : position
                }
                rotation={
                    hoverCard?.id === card.id || selectedCard?.id === card.id
                        ? rotation
                        : [0, 0, 0]
                }
                animate={{
                    x: 0,
                    y:
                        hoverCard?.id === card.id ||
                        selectedCard?.id === card.id
                            ? 0.2
                            : 0,
                    z:
                        hoverCard?.id === card.id ||
                        selectedCard?.id === card.id
                            ? 0.11
                            : 0,
                    scale: selectedCard?.id === card.id ? 1.2 : 1,
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
                        selectedCard?.id === card.id ||
                        hoverCard?.id === card.id
                            ? 'red'
                            : 'blue'
                    }
                />
            </motion.mesh>
            <Text
                position={[0, 0.6, 0]}
                fontSize={0.2}
                color="black"
                anchorX="center"
                anchorY="middle"
            >
                {card.name}
            </Text>
        </motion.group>
    );
}
