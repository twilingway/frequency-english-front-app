import { useSelector } from 'react-redux';

import { getPlayerDeck } from '../../store/selectors/getPlayerDeck/getPlayerDeck';
import { getOpponentDeck } from '../../store/selectors/getOpponentDeck/getOpponentDeck';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion-3d';
import {
    ICard,
    setPlayerDeck,
    setPlayerHand,
    setSelectedCard,
} from '../../store/slices/playerSlice';
import { Box } from '@react-three/drei';
import { Card } from '../../shared/ui';
import { useAppDispatch } from '../../shared/lib/hooks/useAppDispatch/useAppDispatch';
import { getSelectedCard } from '../../store/selectors/getSelectedCard/getSelectedCard';
import { getLines } from '../../store/selectors/getLines/getLines';
import { getPlayerHand } from '../../store/selectors/getPlayerHand/getPlayerHand';
import { getOpponentHand } from '../../store/selectors/getOpponentHand/getOpponentHand';

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
    const dispatch = useAppDispatch();

    const { playerLine1, playerLine2, opponentLine1, opponentLine2 } =
        useSelector(getLines);

    const deck = useSelector(
        playerType === 'player' ? getPlayerDeck : getOpponentDeck,
    );

    const hand = useSelector(
        playerType === 'player' ? getPlayerHand : getOpponentHand,
    );

    const selectedCard = useSelector(getSelectedCard);

    // const [selectedCardIndex, setSelectedCardIndex] = useState<number | null>(
    //     null,
    // );
    const [hoverCard, setHoverCard] = useState<ICard | null>(null);
    // const [animatingCards, setAnimatingCards] = useState<ICard[]>([]);

    const handleSelectedCard = (car: ICard | null) => {
        // setSelectedCardIndex(index);
        console.log('SelectedCar :>> ', car);
        dispatch(setSelectedCard(car));
        // addObjectToLine();
    };

    // const setDragging = (isDragging: boolean) => {
    //     console.log('isDragging :>> ', isDragging);
    // };

    const handleHoverCard = (car: ICard | null) => {
        setHoverCard(car);
        // console.log('hoverCardIndex :>> ', car);
    };

    useEffect(() => {
        if (deck.length === 30) {
            // setAnimatingCards(playerDeck.slice(-10));
            dispatch(setPlayerHand(deck.slice(-10)));
        }
    }, [dispatch, deck]);

    const angleStep = Math.PI / 110; // Adjust the angle step as needed
    const radius = 24; // Adjust the radius as needed

    return (
        <>
            {hand.map((card, index) => {
                const angle = angleStep * (index - (hand.length - 1) / 2);
                const x = radius * Math.sin(angle);
                const y = radius * (Math.cos(angle) - 1);

                return (
                    <motion.group
                        key={card.id}
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
                            damping: 5,
                        }}
                        onPointerDown={(event) => {
                            console.log('motion.group :>> ', event);
                        }}
                        onClick={(event) => {
                            console.log('motion.grouponClick :>> ', event);
                        }}
                    >
                        <Card
                            key={card.id}
                            card={card}
                            rotation={[0, 0, angle]}
                            // position={[-4.5 + index, 0, 0]} // Position cards in hand
                            selectedCard={selectedCard}
                            setSelectedCard={handleSelectedCard}
                            // setDragging={setDragging}
                            setHoverCard={handleHoverCard}
                            hoverCard={hoverCard}
                        />
                    </motion.group>
                );
            })}
        </>
    );
};
