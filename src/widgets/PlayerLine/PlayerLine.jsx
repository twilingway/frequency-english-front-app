import { useState } from 'react';
import { DraggableLine } from '../DraggableLine/DraggableLine';

const LINE_LENGTH = 10;
const MAX_OBJECTS = 9;

const position = [0, 1, 0];
const lineId = 1;
export function PlayerLine() {
    const [line1Objects, setLine1Objects] = useState([]);
    const [selectedCardIndex, setSelectedCardIndex] = useState(null);

    const addObjectToLine = (line, newIndex, cardIndex) => {
        const newObj = { ...playerHand[cardIndex], position: [0, 0.25, 0] };
        let updatedObjects;
        if (line === 1) {
            updatedObjects = [...line1Objects];
            updatedObjects.splice(newIndex, 0, newObj);
            if (updatedObjects.length > MAX_OBJECTS) return;
            setLine1Objects(updatedObjects);
        } else {
            // updatedObjects = [...line2Objects];
            // updatedObjects.splice(newIndex, 0, newObj);
            // if (updatedObjects.length > MAX_OBJECTS) return;
            // setLine2Objects(updatedObjects);
        }

        // Удаляем карту из руки игрока
        // setPlayerHand(playerHand.filter((_, index) => index !== cardIndex));
        setSelectedCardIndex(null);

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
            // setLine2Objects([...updatedObjects]);
        }
    };

    const addObject = (newIndex, cardIndex) => {
        addObjectToLine(lineId, newIndex, cardIndex);
    };

    return (
        <DraggableLine
            position={position}
            objects={line1Objects}
            addObject={addObject}
            selectedCardIndex={selectedCardIndex}
            setLineObjects={setLine1Objects}
        />
    );
}
