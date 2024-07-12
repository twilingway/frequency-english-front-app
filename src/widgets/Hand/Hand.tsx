import { useSelector } from 'react-redux';

import { getPlayerDeck } from '../../store/selectors/getPlayerDeck/getPlayerDeck';
import { getOpponentDeck } from '../../store/selectors/getOpponentDeck/getOpponentDeck';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion-3d';
import { ICard } from '../../store/slices/playerSlice';
import { Box } from '@react-three/drei';
import { Card } from '../../shared/ui';

interface IHandProps {
    playerType?: 'player' | 'opponent';
}
export const Hand = ({
    // cards,
    // selectedCardIndex,
    // setSelectedCardIndex,
    // setDragging,
    playerType = 'player',
}: IHandProps) => {
    const playerDeck = useSelector(
        playerType === 'player' ? getPlayerDeck : getOpponentDeck,
    );

    const [selectedCardIndex, setSelectedCardIndex] = useState<number | null>(
        null,
    );
    const [hoverCardIndex, setHoverCardIndex] = useState<number | null>(null);
    const [animatingCards, setAnimatingCards] = useState<ICard[]>([]);

    const handleSelectedCardIndex = (index: number | null) => {
        setSelectedCardIndex(index);
        console.log('SelectedCarIndex :>> ', index);
    };

    const setDragging = (isDragging: boolean) => {
        console.log('isDragging :>> ', isDragging);
    };

    const handleHoverCardIndex = (index: number | null) => {
        setHoverCardIndex(index);
        console.log('hoverCardIndex :>> ', index);
    };

    useEffect(() => {
        if (playerDeck.length === 30) {
            setAnimatingCards(playerDeck.slice(-10));
        }
    }, [playerDeck]);

    const angleStep = Math.PI / 110; // Adjust the angle step as needed
    const radius = 24; // Adjust the radius as needed

    return (
        <>
            {animatingCards.map((card, index) => {
                const angle =
                    angleStep * (index - (animatingCards.length - 1) / 2);
                const x = radius * Math.sin(angle);
                const y = radius * (Math.cos(angle) - 1);

                return (
                    <motion.group
                        key={card.id}
                        // initial={{ x: 5, y: -3, z: 0 }}
                        initial={{ x: 5, y: -3, z: 0 }}
                        // animate={{
                        //     x: (-0.768 - 0.0) * index + 4,
                        //     y: -3.3,
                        //     z: 0,
                        // }}
                        animate={{
                            x: x,
                            y: -3 + y,
                            z: 0.01 * index,
                        }}
                        rotation={[0, 0, -angle]}
                        transition={{
                            type: 'spring',
                            stiffness: 100,
                            damping: 10,
                        }}
                    >
                        <Card
                            key={card.id}
                            name={card.name}
                            rotation={[0, 0, angle]}
                            // position={[-4.5 + index, 0, 0]} // Position cards in hand
                            cardIndex={index}
                            selectedCardIndex={selectedCardIndex}
                            setSelectedCardIndex={handleSelectedCardIndex}
                            setDragging={setDragging}
                            setHoverCardIndex={handleHoverCardIndex}
                            hoverCardIndex={hoverCardIndex}
                        />
                    </motion.group>
                );
            })}
        </>
    );
};
