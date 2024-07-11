import { Line, Plane } from '@react-three/drei';
import { useRef } from 'react';

const LINE_LENGTH = 10;
const MAX_OBJECTS = 9;
const SPACING = LINE_LENGTH / (MAX_OBJECTS + 1);

export function DraggableLine({ position, objects, addObject, dragging }) {
    return (
        <group position={position}>
            <Plane args={[LINE_LENGTH, 1]} rotation={[0, 0, 0]}>
                <meshStandardMaterial color="lightgrey" />
            </Plane>
            {objects.map((obj, index) => (
                <mesh key={index} position={obj.position}>
                    <boxGeometry args={[0.5, 0.5, 0.5]} />
                    <meshStandardMaterial color="blue" />
                </mesh>
            ))}
            {Array.from({ length: MAX_OBJECTS }).map((_, index) => {
                const xPos = -LINE_LENGTH / 2 + SPACING * (index + 1);
                const isOccupied = objects.some(
                    (obj) => Math.abs(obj.position[0] - xPos) < SPACING / 2,
                );
                return (
                    <mesh
                        key={index}
                        position={[xPos, 0.01, 0]}
                        visible={dragging && !isOccupied}
                    >
                        <boxGeometry args={[0.5, 0.5, 0.01]} />
                        <meshStandardMaterial
                            color="yellow"
                            opacity={0.5}
                            transparent
                        />
                    </mesh>
                );
            })}
            <Plane
                args={[LINE_LENGTH, 1]}
                // rotation={[-Math.PI / 2, 0, 0]}
                position={[0, 0.01, 0]}
                onPointerDown={(e) => {
                    if (dragging) addObject(e.intersections[0].point);
                }}
                visible={false}
            />
        </group>
    );
}
