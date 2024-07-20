import { useEffect, useState } from 'react';
import { CoinFlip } from '../CoinFlip/CoinFlip';
import { Hand } from '../Hand/Hand';
import { PlayerDeck } from '../PlayerDeck/PlayerDeck';
import { PlayerLine } from '../PlayerLine/PlayerLine';

const LINE_LENGTH = 10;
const MAX_OBJECTS = 9;

export function Scene() {
    const [line1Objects, setLine1Objects] = useState([]);
    const [line2Objects, setLine2Objects] = useState([]);
    const [playerHand, setPlayerHand] = useState([]);
    const [opponentHand, setOpponentHand] = useState([]);
    const [selectedCardIndex, setSelectedCardIndex] = useState(null);
    // const [dragging, setDragging] = useState(false);
    const [firstPlayer, setFirstPlayer] = useState(null);

    useEffect(() => {
        const handleContextMenu = (event) => {
            event.preventDefault();
        };
        const handlePointerUp = (event) => {
            if (event.button === 2 || event.type === 'dblclick') {
                setSelectedCardIndex(null);
                // setDragging(false);
            }
        };

        window.addEventListener('contextmenu', handleContextMenu);
        window.addEventListener('pointerup', handlePointerUp);
        window.addEventListener('dblclick', handlePointerUp);
        return () => {
            window.removeEventListener('contextmenu', handleContextMenu);
            window.removeEventListener('pointerup', handlePointerUp);
            window.removeEventListener('dblclick', handlePointerUp);
        };
    }, []);

    // useEffect(() => {
    //     console.log('Player hand updated:', playerHand);
    //     console.log('Opponent hand updated:', opponentHand);
    // }, [playerHand, opponentHand]);

    // const addObjectToLine = (line, newIndex, cardIndex) => {
    //     const newObj = { ...playerHand[cardIndex], position: [0, 0.25, 0] };
    //     let updatedObjects;
    //     if (line === 1) {
    //         updatedObjects = [...line1Objects];
    //         updatedObjects.splice(newIndex, 0, newObj);
    //         if (updatedObjects.length > MAX_OBJECTS) return;
    //         setLine1Objects(updatedObjects);
    //     } else {
    //         updatedObjects = [...line2Objects];
    //         updatedObjects.splice(newIndex, 0, newObj);
    //         if (updatedObjects.length > MAX_OBJECTS) return;
    //         setLine2Objects(updatedObjects);
    //     }

    //     // Удаляем карту из руки игрока
    //     setPlayerHand(playerHand.filter((_, index) => index !== cardIndex));
    //     setSelectedCardIndex(null);
    //     setDragging(false);

    //     // Center objects on the line
    //     const totalObjects = updatedObjects.length;
    //     const spacing = LINE_LENGTH / (totalObjects + 1);
    //     updatedObjects.forEach((obj, index) => {
    //         obj.position[0] = -LINE_LENGTH / 2 + spacing * (index + 1);
    //     });

    //     // Update state to trigger re-render
    //     if (line === 1) {
    //         setLine1Objects([...updatedObjects]);
    //     } else {
    //         setLine2Objects([...updatedObjects]);
    //     }
    // };

    // if (!firstPlayer) {
    //     return <CoinFlip setFirstPlayer={setFirstPlayer} />;
    // }

    return (
        <>
            <PlayerDeck position={[5, 3, 0]} playerType="opponent" />
            <PlayerDeck position={[5, -3, 0]} />
            <Hand
            // cards={playerHand}
            // selectedCardIndex={selectedCardIndex}
            // setSelectedCardIndex={setSelectedCardIndex}
            // setDragging={setDragging}
            />
            {/* <Hand
                cards={opponentHand}
                selectedCardIndex={selectedCardIndex}
                setSelectedCardIndex={setSelectedCardIndex}
                setDragging={setDragging}
            /> */}
            <PlayerLine
            // position={[0, 1, 0]}
            // objects={line1Objects}
            // setObjects={setLine1Objects}
            // dragging={dragging}
            // selectedCardIndex={selectedCardIndex}
            // addObjectToLine={addObjectToLine}
            // lineId={1}
            />
            {/* <PlayerLine
                position={[0, -1, 0]}
                objects={line2Objects}
                setObjects={setLine2Objects}
                dragging={dragging}
                selectedCardIndex={selectedCardIndex}
                addObjectToLine={addObjectToLine}
                lineId={2}
            /> */}
        </>
    );
}
