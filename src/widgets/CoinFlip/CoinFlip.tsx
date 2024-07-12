import { useState, useEffect } from 'react';
import { motion } from 'framer-motion-3d';
import { Text, Cylinder } from '@react-three/drei';
import * as THREE from 'three';

const COIN_SIZE = 1;
const COIN_THICKNESS = 0.1;
const FLIP_DURATION = 5; // Increased duration to slow down the flip

export function CoinFlip({ setFirstPlayer }) {
    const [flipping, setFlipping] = useState(false);
    const [result, setResult] = useState(null);
    const [showResult, setShowResult] = useState(false);

    const flipCoin = () => {
        setFlipping(true);
        setTimeout(() => {
            const flipResult = Math.random() < 0.5 ? 'heads' : 'tails';
            setResult(flipResult);
            setFlipping(false);
            setShowResult(true);
        }, FLIP_DURATION * 1000);
    };

    useEffect(() => {
        if (showResult) {
            const timer = setTimeout(() => {
                setFirstPlayer(result === 'heads' ? 'blue' : 'red');
            }, 10000); // Show result for 10 seconds
            return () => clearTimeout(timer);
        }
    }, [showResult, result, setFirstPlayer]);

    return (
        <group>
            <motion.group
                initial={{ rotateX: 0 }}
                animate={{ rotateX: flipping ? 360 * 5 : 0 }}
                transition={{ duration: FLIP_DURATION, ease: 'easeInOut' }}
                onClick={flipCoin}
                cursor="pointer"
            >
                <Cylinder
                    args={[COIN_SIZE, COIN_SIZE, COIN_THICKNESS, 32]}
                    rotation={[Math.PI / 2, 0, 0]}
                >
                    <meshStandardMaterial
                        attachArray="material"
                        color="gold"
                        side={THREE.DoubleSide}
                    />
                    <meshStandardMaterial
                        attachArray="material"
                        color="silver"
                        side={THREE.DoubleSide}
                    />
                    <meshStandardMaterial attachArray="material" color="grey" />
                </Cylinder>
                <Text
                    position={[0, 0, COIN_THICKNESS / 2 + 0.01]}
                    fontSize={0.3}
                    color="black"
                    anchorX="center"
                    anchorY="middle"
                    rotation={[Math.PI / 2, 0, 0]}
                >
                    Heads
                </Text>
                <Text
                    position={[0, 0, -COIN_THICKNESS / 2 - 0.01]}
                    fontSize={0.3}
                    color="black"
                    anchorX="center"
                    anchorY="middle"
                    rotation={[-Math.PI / 2, 0, 0]}
                >
                    Tails
                </Text>
            </motion.group>
            <Text
                position={[0, -2, 0]}
                fontSize={0.5}
                color="black"
                anchorX="center"
                anchorY="middle"
            >
                {showResult
                    ? `First player: ${result === 'heads' ? 'Blue' : 'Red'}`
                    : flipping
                    ? 'Flipping...'
                    : 'Click to Flip'}
            </Text>
        </group>
    );
}
