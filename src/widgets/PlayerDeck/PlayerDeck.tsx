import { useMemo, useState, useCallback, useEffect, memo } from 'react';
import { shuffle } from 'lodash';
import { motion } from 'framer-motion-3d';
import { Box, Text } from '@react-three/drei';
import { useAppDispatch } from '../../shared/lib/hooks/useAppDispatch/useAppDispatch';
import { Vector3 } from '@react-three/fiber';
import {
    ICard,
    setOpponentDeck,
    setPlayerDeck,
} from '../../store/slices/playerSlice';
import { useSelector } from 'react-redux';
import { getPlayerDeck } from '../../store/selectors/getPlayerDeck/getPlayerDeck';
import { getOpponentDeck } from '../../store/selectors/getOpponentDeck/getOpponentDeck';

const DECK_SIZE = 30;
const HAND_SIZE = 10;
const CARD_NAMES = [
    'the',
    'be',
    'to',
    'of',
    'and',
    'a',
    'in',
    'that',
    'have',
    'I',
    'it',
    'for',
    'not',
    'on',
    'with',
    'he',
    'as',
    'you',
    'do',
    'at',
    'this',
    'but',
    'his',
    'by',
    'from',
    'they',
    'we',
    'say',
    'her',
    'she',
];

export interface IPlayerDeckProps {
    playerType?: 'player' | 'opponent';
    position?: Vector3;
}

export const PlayerDeck = memo(
    ({ position, playerType = 'player' }: IPlayerDeckProps) => {
        const dispatch = useAppDispatch();

        const playerDeck = useSelector(
            playerType === 'player' ? getPlayerDeck : getOpponentDeck,
        );

        //  const drawHand = useCallback(
        //      (deck) => {
        //          // const shuffledDeck = shuffle(deck);
        //          const newHand = deck.slice(0, HAND_SIZE);
        //          setHand(newHand);
        //          setAnimatingCards(newHand);
        //          setDeck(deck.slice(HAND_SIZE));
        //          console.log('Deck after draw:', deck.slice(HAND_SIZE));
        //          console.log('Hand:', newHand);
        //      },
        //      [setHand],
        //  );
        // const [shuffleDeck, setShuffleDeck] = useState<Card[]>([]);
        // const [animatingCards, setAnimatingCards] = useState<Card[]>([]);

        // const initialDeck = useMemo(() => {
        //     const newDeck: Card[] = shuffle(CARD_NAMES.slice(0, DECK_SIZE)).map(
        //         (name, i) => ({
        //             id: i,
        //             name,
        //             position: [0, 0, 0],
        //         }),
        //     );
        //     console.log(`Initialized deck ${type}: `, newDeck);
        //     // drawHand(newDeck);
        //     setShuffleDeck(newDeck);
        //     switch (type) {
        //         case 'player':
        //             dispatch(setPlayerDeck(newDeck));
        //             break;
        //         case 'opponent':
        //             dispatch(setOpponentDeck(newDeck));
        //             break;
        //         default:
        //             break;
        //     }
        //     return newDeck;
        // }, [dispatch, type]);

        useEffect(() => {
            if (CARD_NAMES) {
                const newDeck: ICard[] = shuffle(
                    CARD_NAMES.slice(0, DECK_SIZE),
                ).map((name, i) => ({
                    id: i,
                    name,
                    position: [0, 0, 0],
                }));
                console.log(`Initialized deck ${playerType}: `, newDeck);
                // drawHand(newDeck);
                // const last10Cards = newDeck.slice(-10);
                // const newDeckWithoutLast10 = newDeck.slice(0, -10);
                // setAnimatingCards(last10Cards);
                // setShuffleDeck(newDeck);
                switch (playerType) {
                    case 'player':
                        dispatch(setPlayerDeck(newDeck));
                        break;
                    case 'opponent':
                        dispatch(setOpponentDeck(newDeck));
                        break;
                    default:
                        break;
                }
            }
            // if (deck.length > 0) {
            //     drawHand(deck);
            // }
        }, [dispatch, playerType]);

        // useEffect(() => {
        //     if (animatingCards.length > 0) {
        //         const timer = setTimeout(() => {
        //             setAnimatingCards([]);
        //         }, 5000); // Duration of the animation
        //         return () => clearTimeout(timer);
        //     }
        // }, [animatingCards]);

        return (
            <group position={position}>
                {/* Position the deck */}
                {playerDeck.map((card, index) => {
                    const offsetX = (Math.random() - 0.5) * 0.1;
                    const offsetY = (Math.random() - 0.5) * 0.1;
                    return (
                        <motion.group
                            key={card.id}
                            position={[offsetX, offsetY, -0.01 * index]} // Stacking effect with random offset
                        >
                            <Box args={[0.5, 0.75, 0.05]}>
                                <meshStandardMaterial color="blue" />
                            </Box>
                        </motion.group>
                    );
                })}
                {/* {animatingCards.map((card, index) => (
                    <motion.group
                        key={card.id}
                        initial={{ x: 0, y: 0, z: -0.01 * index }}
                        animate={{ x: -4.5 + index, y: -3, z: 0 }}
                        transition={{
                            type: 'spring',
                            stiffness: 100,
                            damping: 10,
                        }}
                    >
                        <Box args={[0.5, 0.75, 0.05]}>
                            <meshStandardMaterial color="blue" />
                        </Box>
                    </motion.group>
                ))} */}
                <Text
                    position={
                        playerType === 'player' ? [0, 0.2, 0.1] : [0, -0.2, 0.1]
                    }
                    fontSize={0.3}
                    color="white"
                    anchorX="center"
                    anchorY="middle"
                >
                    {playerDeck.length}
                </Text>
            </group>
        );
    },
);
