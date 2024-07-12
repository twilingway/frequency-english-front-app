import { useEffect, useState } from 'react';
import { Card } from '../../shared/ui';
import { DraggableLine } from '../DraggableLine/DraggableLine';
import { Deck } from '../Deck/Deck';

const LINE_LENGTH = 10;
const MAX_OBJECTS = 9;

export function Scene() {
    const [line1Objects, setLine1Objects] = useState([]);
    const [line2Objects, setLine2Objects] = useState([]);
    const [hand, setHand] = useState([]);
    const [selectedCardIndex, setSelectedCardIndex] = useState(null);
    const [dragging, setDragging] = useState(false);

    useEffect(() => {
        const handleContextMenu = (event) => {
            event.preventDefault();
        };
        const handlePointerUp = (event) => {
            if (event.button === 2 || event.type === 'dblclick') {
                setSelectedCardIndex(null);
                setDragging(false);
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

    useEffect(() => {
        console.log('Hand updated:', hand);
    }, [hand]);

    const addObjectToLine = (line, newIndex, cardIndex) => {
        const newObj = { ...hand[cardIndex], position: [0, 0.25, 0] };
        let updatedObjects;
        if (line === 1) {
            updatedObjects = [...line1Objects];
            updatedObjects.splice(newIndex, 0, newObj);
            if (updatedObjects.length > MAX_OBJECTS) return;
            setLine1Objects(updatedObjects);
        } else {
            updatedObjects = [...line2Objects];
            updatedObjects.splice(newIndex, 0, newObj);
            if (updatedObjects.length > MAX_OBJECTS) return;
            setLine2Objects(updatedObjects);
        }

        // Удаляем карту из руки игрока
        setHand(hand.filter((_, index) => index !== cardIndex));
        setSelectedCardIndex(null);
        setDragging(false);

        // Center objects on the line
        const totalObjects = updatedObjects.length;
        const spacing = LINE_LENGTH / (totalObjects + 1);
        updatedObjects.forEach((obj, index) => {
            obj.position[0] = -LINE_LENGTH / 2 + spacing * (index + 1);
        });

        // Update state to trigger re-render
        if (line === 1) {
            setLine1Objects([...updatedObjects]);
        } else {
            setLine2Objects([...updatedObjects]);
        }
    };

    return (
        <>
            <Deck setHand={setHand} />
            {hand.map((card, index) => (
                <Card
                    key={card.id}
                    id={card.id}
                    name={card.name}
                    position={[-4.5 + index, -3, 0]} // Position cards in hand
                    cardIndex={index}
                    selectedCardIndex={selectedCardIndex}
                    setSelectedCardIndex={setSelectedCardIndex}
                    setDragging={setDragging}
                />
            ))}
            <DraggableLine
                position={[0, 1, 0]}
                objects={line1Objects}
                addObject={(newIndex, cardIndex) =>
                    addObjectToLine(1, newIndex, cardIndex)
                }
                dragging={dragging}
                selectedCardIndex={selectedCardIndex}
                setLineObjects={setLine1Objects}
            />
            <DraggableLine
                position={[0, -1, 0]}
                objects={line2Objects}
                addObject={(newIndex, cardIndex) =>
                    addObjectToLine(2, newIndex, cardIndex)
                }
                dragging={dragging}
                selectedCardIndex={selectedCardIndex}
                setLineObjects={setLine2Objects}
            />
        </>
    );
}
