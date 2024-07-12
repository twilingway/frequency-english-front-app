import { DraggableLine } from '../DraggableLine/DraggableLine';

export function PlayerLine({
    position,
    objects,
    setObjects,
    dragging,
    selectedCardIndex,
    addObjectToLine,
    lineId,
}) {
    const addObject = (newIndex, cardIndex) => {
        addObjectToLine(lineId, newIndex, cardIndex);
    };

    return (
        <DraggableLine
            position={position}
            objects={objects}
            addObject={addObject}
            dragging={dragging}
            selectedCardIndex={selectedCardIndex}
            setLineObjects={setObjects}
        />
    );
}
