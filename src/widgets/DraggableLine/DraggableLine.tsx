import { Line, Plane, Text } from '@react-three/drei';
import { useThree } from '@react-three/fiber';
import { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import * as THREE from 'three';
import { motion } from 'framer-motion-3d';
import { useSelector } from 'react-redux';
import { getSelectedCard } from '../../store/selectors/getSelectedCard/getSelectedCard';
import { useAppDispatch } from '../../shared/lib/hooks/useAppDispatch/useAppDispatch';
import { getLines } from '../../store/selectors/getLines/getLines';
import { setPlayerLine1 } from '../../store/slices/lineSlice';
import {
    ICard,
    setPlayerHand,
    setSelectedCard,
} from '../../store/slices/playerSlice';
import { getPlayerHand } from '../../store/selectors/getPlayerHand/getPlayerHand';

const LINE_LENGTH = 9;
const MAX_OBJECTS = 9;
const SPACING = LINE_LENGTH / (MAX_OBJECTS + 1);
const CARD_SIZE = [0.768, 1.024, 0.02];
const GAP = 0.2;

export const DraggableLine = memo(
    ({
        lineName = 'playerLine1',
        position,
        // objects = [{ position: [0, 0, 0] }],
        // addObject,
        // dragging = true,
        // selectedCardIndex,
        // setLineObjects,
    }) => {
        const dispatch = useAppDispatch();
        // const lineRef = useRef();
        const { camera, gl } = useThree();
        const raycaster = useRef(new THREE.Raycaster());
        const mouse = useRef(new THREE.Vector2());
        const [highlightedIndex, setHighlightedIndex] = useState<number | null>(
            null,
        );
        // dragging = true;
        const selectedCard = useSelector(getSelectedCard);

        const hand = useSelector(getPlayerHand);

        const { playerLine1, playerLine2, opponentLine1, opponentLine2 } =
            useSelector(getLines);

        const objects = useMemo(() => {
            switch (lineName) {
                case 'playerLine1':
                    return playerLine1;
                case 'playerLine2':
                    return playerLine2;
                case 'opponentLine1':
                    return opponentLine1;
                case 'opponentLine2':
                    return opponentLine2;
                default:
                    return [];
            }
        }, [lineName, opponentLine1, opponentLine2, playerLine1, playerLine2]);

        const addObjectToLine = useCallback(
            (line, newIndex, card) => {
                const newObj = { ...card, position: [0, 0.25, 0] };
                let updatedObjects;
                if (line === 1) {
                    updatedObjects = [...playerLine1];
                    updatedObjects.splice(newIndex, 0, newObj);
                    if (updatedObjects.length > MAX_OBJECTS) return;
                    dispatch(setPlayerLine1(updatedObjects));
                    // setLine1Objects(updatedObjects);
                } else {
                    // updatedObjects = [...line2Objects];
                    // updatedObjects.splice(newIndex, 0, newObj);
                    // if (updatedObjects.length > MAX_OBJECTS) return;
                    // setLine2Objects(updatedObjects);
                }

                // Удаляем карту из руки игрока
                dispatch(
                    setPlayerHand(hand.filter((item) => item.id !== card.id)),
                );
                dispatch(setSelectedCard(null));
                // setPlayerHand(playerHand.filter((_, index) => index !== cardIndex));
                // setSelectedCardIndex(null);
                // setDragging(false);

                // Center objects on the line
                const totalObjects = updatedObjects.length;
                const spacing = LINE_LENGTH / (totalObjects + 1);
                updatedObjects.forEach((obj, index) => {
                    obj.position[0] = -LINE_LENGTH / 2 + spacing * (index + 1);
                });

                // Update state to trigger re-render
                if (line === 1) {
                    dispatch(setPlayerLine1([...updatedObjects]));
                    // setLine1Objects([...updatedObjects]);
                } else {
                    // setLine2Objects([...updatedObjects]);
                }
            },
            [dispatch, hand, playerLine1],
        );

        // console.log('selectedCard :>> ', selectedCard);
        const onPointerMove = useCallback(
            (index) => {
                if (!selectedCard) return;
                // mouse.current.set(
                //     (event.clientX / window.innerWidth) * 2 - 1,
                //     -(event.clientY / window.innerHeight) * 2 + 1,
                // );
                // raycaster.current.setFromCamera(mouse.current, camera);
                // const intersects = raycaster.current.intersectObject(
                //     lineRef.current,
                // );
                // console.log('intersects :>> ', intersects);
                // if (intersects.length > 0) {
                //     const intersect = intersects[0];
                //     const xPos = intersect.point.x;
                //     let closestIndex = objects.length;
                //     for (let i = 0; i < objects.length; i++) {
                //         if (xPos < objects[i].position[0] + i) {
                //             closestIndex = i;
                //             break;
                //         }
                //     }
                // } else {
                //     setHighlightedIndex(null);
                // }
                setHighlightedIndex(index);
            },
            [selectedCard],
        );

        const onPointerDown = useCallback(
            (event) => {
                console.log('event.button :>> ', event.button);
                if (
                    event.button === 0 &&
                    highlightedIndex !== null &&
                    selectedCard !== null
                ) {
                    // dispatch(setPlayerLine1([selectedCard]));
                    console.log('highlightedIndex :>> ', highlightedIndex);
                    addObjectToLine(1, highlightedIndex, selectedCard);
                    setHighlightedIndex(null);
                }
            },
            [addObjectToLine, highlightedIndex, selectedCard],
        );

        useEffect(() => {
            // gl.domElement.addEventListener('pointermove', onPointerMove);
            // gl.domElement.addEventListener('pointerdown', onPointerDown);
            // return () => {
            //     gl.domElement.removeEventListener('pointermove', onPointerMove);
            //     gl.domElement.removeEventListener('pointerdown', onPointerDown);
            // };
        }, [
            gl.domElement,

            highlightedIndex,
            selectedCard,
            onPointerMove,
            onPointerDown,
        ]);
        // const totalObjects = objects.length;
        // const spacing = LINE_LENGTH / (totalObjects + 1);
        return (
            <group position={position} rotation={[0, 0, 0]}>
                <Plane
                    // ref={lineRef}
                    args={[LINE_LENGTH, 1.5]}
                    rotation={[0, 0, 0]}
                >
                    <meshStandardMaterial color="lightgrey" />
                </Plane>
                {objects.map((obj, index) => {
                    let xPos = 0;
                    if (objects.length >= 1) {
                        xPos =
                            -((objects.length - 1) * CARD_SIZE[0]) / 2 +
                            index * CARD_SIZE[0];
                    }
                    if (highlightedIndex !== null) {
                        console.log('highlightedIndex :>> ', highlightedIndex);
                        if (highlightedIndex === 0) {
                            xPos =
                                -((objects.length - 2) * CARD_SIZE[0]) / 2 +
                                index * CARD_SIZE[0];
                        } else if (highlightedIndex === objects.length) {
                            xPos =
                                -(objects.length * CARD_SIZE[0]) / 2 +
                                index * CARD_SIZE[0];
                        }
                    }
                    return (
                        <motion.group key={obj.id}>
                            <motion.mesh
                                // position={obj.position}
                                animate={{
                                    x: xPos,
                                    y: 0,
                                    z: 0,
                                }}
                                transition={{
                                    type: 'spring',
                                    stiffness: 100,
                                    damping: 10,
                                }}
                                scale={0.96}
                            >
                                <boxGeometry args={[0.768, 1.024, 0.02]} />
                                <meshStandardMaterial color="blue" />
                            </motion.mesh>
                            <Text
                                position={[
                                    objects.length === 1
                                        ? 0
                                        : -(
                                              (objects.length - 1) *
                                              CARD_SIZE[0]
                                          ) /
                                              2 +
                                          index * CARD_SIZE[0],

                                    obj.position[1] + 0.6,
                                    obj.position[2],
                                ]}
                                fontSize={0.2}
                                color="black"
                                anchorX="center"
                                anchorY="middle"
                            >
                                {obj.name} {'=>' + index}
                            </Text>
                        </motion.group>
                    );
                })}
                {Array.from({ length: objects.length + 1 }).map((_, index) => {
                    return (
                        <mesh
                            key={index}
                            position={[
                                -(objects.length * CARD_SIZE[0]) / 2 +
                                    index * CARD_SIZE[0],

                                0.0,
                                0.1,
                            ]}
                            // visible={!!selectedCard && !isOccupied}
                            visible={!!selectedCard}
                            // onClick={(event) => {
                            //     console.log('event :>> ', event);
                            // }}
                            onPointerMove={(event) => {
                                // console.log('event :>> ', event);
                                console.log('index :>> ', index);
                                onPointerMove(index);
                            }}
                            onPointerDown={(event) => {
                                onPointerDown(event);
                            }}
                            onPointerLeave={() => setHighlightedIndex(null)}
                        >
                            <boxGeometry
                                args={[
                                    CARD_SIZE[0],
                                    CARD_SIZE[1],
                                    CARD_SIZE[2],
                                ]}
                            />
                            <meshStandardMaterial
                                color={
                                    highlightedIndex === index
                                        ? 'yellow'
                                        : 'green'
                                }
                                opacity={0.5}
                                transparent
                            />
                        </mesh>
                    );
                })}
            </group>
        );
    },
);
