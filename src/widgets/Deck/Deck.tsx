import { useMemo, useState, useCallback, useEffect } from 'react';
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

export function Deck({ setHand }) {
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
        <>
            {deck.map((card, index) => {
                const offset = (Math.random() - 0.5) * 0.1;
                return (
                    <motion.group
                        key={card.id}
                        position={[2 + offset, 0.01 * index, -2 + offset]} // Stacking effect with random offset
                    >
                        <Box args={[0.5, 0.75, 0.05]}>
                            <meshStandardMaterial color="blue" />
                        </Box>
                    </motion.group>
                );
            })}
            {animatingCards.map((card, index) => (
                <motion.group
                    key={card.id}
                    initial={{ x: 2, y: 0.01 * index, z: -2 }}
                    animate={{ x: -4.5 + index, y: -3, z: 0 }}
                    transition={{ type: 'spring', stiffness: 100, damping: 10 }}
                >
                    <Box args={[0.5, 0.75, 0.05]}>
                        <meshStandardMaterial color="blue" />
                    </Box>
                </motion.group>
            ))}
        </>
    );
}
