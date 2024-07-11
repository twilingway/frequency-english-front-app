import { useState } from 'react';
import { Card } from '../../shared/ui';
import { DraggableLine } from '../DraggableLine/DraggableLine';

const LINE_LENGTH = 10;
const MAX_OBJECTS = 9;

export function Scene() {
    const [objectPosition, setObjectPosition] = useState([0, 2, 0]);
    const [line1Objects, setLine1Objects] = useState([]);
    const [line2Objects, setLine2Objects] = useState([]);
    const [dragging, setDragging] = useState(false);

    const addObjectToLine = (line, point) => {
        const newObj = { position: [point.x, 0.25, 0] };
        let updatedObjects;
        if (line === 1) {
            updatedObjects = [...line1Objects, newObj];
            if (updatedObjects.length > MAX_OBJECTS) return;
            setLine1Objects(updatedObjects);
        } else {
            updatedObjects = [...line2Objects, newObj];
            if (updatedObjects.length > MAX_OBJECTS) return;
            setLine2Objects(updatedObjects);
        }

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
            <Card
                position={objectPosition}
                setPosition={setObjectPosition}
                setDragging={setDragging}
            />
            <DraggableLine
                position={[0, -2, 0]}
                objects={line1Objects}
                addObject={(point) => addObjectToLine(1, point)}
                dragging={dragging}
            />
            <DraggableLine
                position={[0, -5, 0]}
                objects={line2Objects}
                addObject={(point) => addObjectToLine(2, point)}
                dragging={dragging}
            />
        </>
    );
}
