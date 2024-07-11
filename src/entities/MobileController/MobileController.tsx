import { Center, ContactShadows, Gltf, Stats, Text } from '@react-three/drei';
import { useThree } from '@react-three/fiber';
import { motion } from 'framer-motion-3d';
import { myPlayer, usePlayersList } from 'playroomkit';

import { degToRad } from 'three/src/math/MathUtils.js';

import { useGameEngine } from '../../shared/hooks/useGameEngine';
import { Card, Character } from '../../shared/ui';
import { PlayerName } from '../../widget';

export const MobileController = () => {
    const me = myPlayer();
    const { players, phase, playerTurn } = useGameEngine();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const myIndex = players.findIndex((player: any) => player.id === me.id);
    const cards = me.getState('cards') || [];
    usePlayersList(true); // force rerender when player change
    let playerIdx = 0;
    const viewport = useThree((state) => state.viewport);
    const scalingRatio = Math.min(1, viewport.width / 3);
    return (
        <group position-y={-1}>
            <ContactShadows opacity={0.12} />

            <group scale={scalingRatio}>
                <group position-z={3.5} position-x={-0.6}>
                    {/* <PlayerName
                        name={me.state.profile.name}
                        position-y={10.8}
                        position-x={-20}
                        position-z={0.5}
                        fontSize={0.2}
                        // follow={true}
                        follow={false}
                        // lockX={false}
                        // lockY={false}
                    /> */}
                    <Text
                        fontSize={0.2}
                        anchorY={'top'}
                        anchorX={'left'}
                        position-x={-0.5}
                        position-y={1}
                        position-z={0.01}
                        color={'green'}
                    >
                        {me.state.profile.name}
                    </Text>
                    <Character
                        character={myIndex}
                        rotation-y={degToRad(45)}
                        scale={0.4}
                    />
                    <Stats />

                    {[...Array(me.getState('gems') || 0)].map((_, index) => (
                        <Gltf
                            key={index}
                            src="/models/UI_Gem_Blue.gltf"
                            position-x={0.7 + index * 0.25}
                            position-y={0.25}
                            scale={0.5}
                        />
                    ))}
                </group>
                {/* CARDS */}
                <group position-y={1}>
                    {cards.map((card, index) => {
                        let cardAnimState = '';
                        const selected = index === me.getState('selectedCard');
                        if (phase === 'cards') {
                            cardAnimState = 'cardSelection';
                            if (selected) {
                                cardAnimState = 'cardSelectionSelected';
                            }
                        } else {
                            if (selected) {
                                cardAnimState = 'selected';
                            }
                        }
                        return (
                            <motion.group
                                key={index}
                                position-x={index * 0.1}
                                position-y={2 - index * 0.1}
                                position-z={-index * 0.1}
                                animate={cardAnimState}
                                variants={{
                                    selected: {
                                        x: -0.1,
                                        y: 2.1,
                                        z: 0.1,
                                    },
                                    cardSelection: {
                                        x: index % 2 ? 0.6 : -0.6,
                                        y: Math.floor(index / 2) * 1.6,
                                        z: -0.5,
                                    },
                                    cardSelectionSelected: {
                                        x: 0,
                                        y: 0,
                                        z: 2,
                                        rotateX: degToRad(-45),
                                        rotateY: 0,
                                        rotateZ: 0,
                                        scale: 1.1,
                                    },
                                }}
                                onClick={() => {
                                    if (phase === 'cards') {
                                        me.setState(
                                            'selectedCard',
                                            index,
                                            true,
                                        );
                                    }
                                }}
                            >
                                <Card type={card} />
                            </motion.group>
                        );
                    })}
                </group>
                {/* {phase === 'playerChoice' && */}
                {players[playerTurn].id === me.id && (
                    <Center disableY disableZ>
                        {players.map(
                            (player, index) =>
                                player.id !== me.id && (
                                    <motion.group
                                        key={player.id}
                                        position-x={playerIdx++ * 0.8}
                                        position-z={-2}
                                        animate={
                                            index ===
                                            me.getState('playerTarget')
                                                ? 'selected'
                                                : ''
                                        }
                                        scale={0.4}
                                        variants={{
                                            selected: {
                                                z: 0,
                                                scale: 0.8,
                                            },
                                        }}
                                    >
                                        <mesh
                                            onClick={() =>
                                                me.setState(
                                                    'playerTarget',
                                                    index,
                                                    true,
                                                )
                                            }
                                            position-y={1}
                                            visible={false}
                                        >
                                            <boxGeometry args={[1.2, 2, 0.5]} />
                                            <meshStandardMaterial color="hotpink" />
                                        </mesh>
                                        {/* <PlayerName
                                            name={player.state.profile.name}
                                            fontSize={0.3}
                                            position-y={0.1}
                                            position-x={-1.2}
                                        /> */}
                                        <Text
                                            fontSize={0.2}
                                            anchorY={'top'}
                                            anchorX={'left'}
                                            position-x={-0.5}
                                            position-y={2}
                                            position-z={0.01}
                                            color={'red'}
                                        >
                                            {player.state.profile.name}
                                        </Text>
                                        <Character
                                            character={index}
                                            animation={
                                                index ===
                                                me.getState('playerTarget')
                                                    ? 'No'
                                                    : 'Idle'
                                            }
                                            name={player.state.profile.name}
                                        />
                                    </motion.group>
                                ),
                        )}
                    </Center>
                )}
            </group>
        </group>
    );
};
