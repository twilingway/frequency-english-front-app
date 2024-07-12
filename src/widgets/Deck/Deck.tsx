import { useMemo, useState, useCallback, useEffect, memo } from 'react';
import { shuffle } from 'lodash';
import { motion } from 'framer-motion-3d';
import { Box } from '@react-three/drei';

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

export const Deck = memo(({ setHand }) => {
    const [deck, setDeck] = useState([]);
    const [animatingCards, setAnimatingCards] = useState([]);

    const initialDeck = useMemo(() => {
        const newDeck = shuffle(CARD_NAMES.slice(0, DECK_SIZE)).map(
            (name, i) => ({
                id: i,
                name,
                position: [0, 0, 0],
            }),
        );
        console.log('Initialized deck:', newDeck);
        return newDeck;
    }, []);

    const drawHand = useCallback(() => {
        const shuffledDeck = shuffle(initialDeck);
        const newHand = shuffledDeck.slice(0, HAND_SIZE);
        setHand(newHand);
        setAnimatingCards(newHand);
        setDeck(shuffledDeck.slice(HAND_SIZE));
        console.log('Deck after draw:', shuffledDeck.slice(HAND_SIZE));
        console.log('Hand:', newHand);
    }, [initialDeck, setHand]);

    useEffect(() => {
        setDeck(initialDeck);
        drawHand();
    }, [initialDeck, drawHand]);

    useEffect(() => {
        if (animatingCards.length > 0) {
            const timer = setTimeout(() => {
                setAnimatingCards([]);
            }, 2000); // Duration of the animation
            return () => clearTimeout(timer);
        }
    }, [animatingCards]);

    return (
        <group position={[6, -2.6, 0.9]} rotation={[-0.3, 0, 0]}>
            {/* Position the deck in the bottom right corner */}
            {deck.map((card, index) => {
                const offsetX = (Math.random() - 0.5) * 0.1;
                const offsetY = (Math.random() - 0.5) * 0.1;
                // console.log(
                //     `offsetX :>>${index}  ${offsetX}, ${offsetY}, ${
                //         0.1 * index
                //     }`,
                // );
                return (
                    <motion.group
                        key={card.id}
                        position={[offsetX, offsetY, 0.01 * index]} // Stacking effect with random offset
                    >
                        <Box args={[0.768, 1.024, 0.02]}>
                            <meshStandardMaterial color="red" />
                        </Box>
                    </motion.group>
                );
            })}
            {animatingCards.map((card, index) => (
                <motion.group
                    key={card.id}
                    initial={{ x: 5, y: -5, z: -0.01 * index }}
                    animate={{ x: -4.5 + index, y: -3, z: 0 }}
                    transition={{ type: 'spring', stiffness: 100, damping: 10 }}
                >
                    <Box args={[0.5, 0.75, 0.05]}>
                        <meshStandardMaterial color="blue" />
                    </Box>
                </motion.group>
            ))}
        </group>
    );
});
