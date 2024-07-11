import { useControls } from 'leva';
import {
    getState,
    isHost,
    onPlayerJoin,
    useMultiplayerState,
    usePlayersList,
} from 'playroomkit';

import React, { useCallback, useEffect, useMemo, useRef } from 'react';
import { randInt } from 'three/src/math/MathUtils.js';

interface IGameState {
    timer: number;
    round: number;
    phase: string;
    playerTurn: number;
    playerStart: number;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    players: any;
    gems: number;
    deck: string[];
    actionSuccess: boolean;
}

// interface IGameEngineContext extends IGameState {
//     startGame: () => void;
//     // eslint-disable-next-line @typescript-eslint/no-explicit-any
//     getCard: () => any;
// }

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const GameEngineContext = React.createContext<any | null>(null);

const TIME_PHASE_CARDS = 10;
const TIME_PHASE_PLAYER_CHOICE = 10;
const TIME_PHASE_PLAYER_ACTION = 3;
export const NB_ROUNDS = 3;
const NB_GEMS = 3;
const CARDS_PER_PLAYER = 4;

interface IGameEngineProviderProps {
    children?: React.ReactNode;
}

export const GameEngineProvider = ({ children }: IGameEngineProviderProps) => {
    // GAME STATE
    const [timer, setTimer] = useMultiplayerState('timer', 0);
    const [round, setRound] = useMultiplayerState('round', 1);
    const [phase, setPhase] = useMultiplayerState('phase', 'lobby');
    const [playerTurn, setPlayerTurn] = useMultiplayerState('playerTurn', 0);
    const [playerStart, setPlayerStart] = useMultiplayerState('playerStart', 0);
    const [deck, setDeck] = useMultiplayerState('deck', []);
    const [gems, setGems] = useMultiplayerState('gems', NB_GEMS);
    const [actionSuccess, setActionSuccess] = useMultiplayerState(
        'actionSuccess',
        true,
    );

    const players = usePlayersList(true);
    players.sort((a, b) => a.id.localeCompare(b.id)); // we sort players by id to have a consistent order through all clients

    const gameState: IGameState = useMemo(
        () => ({
            timer,
            round,
            phase,
            playerTurn,
            playerStart,
            players,
            gems,
            deck,
            actionSuccess,
        }),
        [
            actionSuccess,
            deck,
            gems,
            phase,
            playerStart,
            playerTurn,
            players,
            round,
            timer,
        ],
    );

    const distributeCards = useCallback(
        (nbCards: number) => {
            const newDeck = [...getState('deck')];
            players.forEach((player) => {
                const cards = player.getState('cards') || [];
                for (let i = 0; i < nbCards; i++) {
                    const randomIndex = randInt(0, newDeck.length - 1);
                    cards.push(newDeck[randomIndex]);
                    newDeck.splice(randomIndex, 1);
                }
                player.setState('cards', cards, true);
                player.setState('selectedCard', 0, true);
                player.setState('playerTarget', -1, true);
            });
            setDeck(newDeck, true);
        },
        [players, setDeck],
    );

    const startGame = useCallback(() => {
        if (isHost()) {
            console.log('Start game');
            setTimer(TIME_PHASE_CARDS, true);
            const randomPlayer = randInt(0, players.length - 1); // we choose a random player to start
            setPlayerStart(randomPlayer, true);
            setPlayerTurn(randomPlayer, true);
            setRound(1, true);
            setDeck(
                [
                    ...new Array(16).fill(0).map(() => 'punch'),
                    ...new Array(24).fill(0).map(() => 'grab'),
                    ...new Array(8).fill(0).map(() => 'shield'),
                ],
                true,
            );
            setGems(NB_GEMS, true);
            players.forEach((player) => {
                console.log('Setting up player', player.id);
                player.setState('cards', [], true);
                player.setState('gems', 0, true);
                player.setState('shield', false, true);
                player.setState('winner', false, true);
            });
            distributeCards(CARDS_PER_PLAYER);
            setPhase('cards', true);
        }
    }, [
        distributeCards,
        players,
        setDeck,
        setGems,
        setPhase,
        setPlayerStart,
        setPlayerTurn,
        setRound,
        setTimer,
    ]);

    const performPlayerAction = useCallback(() => {
        const player = players[getState('playerTurn')];
        console.log('Perform player action', player.id);
        const selectedCard = player.getState('selectedCard');
        const cards = player.getState('cards');
        const card = cards[selectedCard];
        let success = true;
        if (card !== 'shield') {
            player.setState('shield', false, true);
        }
        switch (card) {
            case 'punch':
                // eslint-disable-next-line no-case-declarations
                let target = players[player.getState('playerTarget')];
                if (!target) {
                    const targetIndex =
                        (getState('playerTurn') + 1) % players.length;
                    player.setState('playerTarget', targetIndex, true);
                    target = players[targetIndex]; // we punch the next player if playerTarget is not set
                }
                console.log('Punch target', target.id);
                if (target.getState('shield')) {
                    console.log('Target is shielded');
                    success = false;
                    break;
                }
                if (target.getState('gems') > 0) {
                    target.setState('gems', target.getState('gems') - 1, true);
                    setGems(getState('gems') + 1, true);
                    console.log('Target has gems');
                }
                break;
            case 'grab':
                if (getState('gems') > 0) {
                    player.setState('gems', player.getState('gems') + 1, true);
                    setGems(getState('gems') - 1, true);
                    console.log('Grabbed gem');
                } else {
                    console.log('No gems available');
                    success = false;
                }
                break;
            case 'shield':
                console.log('Shield');
                player.setState('shield', true, true);
                break;
            default:
                break;
        }
        setActionSuccess(success, true);
    }, [players, setActionSuccess, setGems]);

    const removePlayerCard = useCallback(() => {
        const player = players[getState('playerTurn')];
        const cards = player.getState('cards');
        const selectedCard = player.getState('selectedCard');
        cards.splice(selectedCard, 1);
        player.setState('cards', cards, true);
    }, [players]);

    const getCard = useCallback(() => {
        const player = players[getState('playerTurn')];
        if (!player) {
            return '';
        }
        const cards = player.getState('cards');
        if (!cards) {
            return '';
        }
        const selectedCard = player.getState('selectedCard');
        return cards[selectedCard];
    }, [players]);

    const phaseEnd = useCallback(() => {
        let newTime = 0;
        switch (getState('phase')) {
            case 'cards':
                if (getCard() === 'punch') {
                    setPhase('playerChoice', true);
                    newTime = TIME_PHASE_PLAYER_CHOICE;
                } else {
                    performPlayerAction();
                    setPhase('playerAction', true);
                    newTime = TIME_PHASE_PLAYER_ACTION;
                }
                break;
            case 'playerChoice':
                performPlayerAction();
                setPhase('playerAction', true);
                newTime = TIME_PHASE_PLAYER_ACTION;
                break;
            case 'playerAction':
                removePlayerCard();
                // eslint-disable-next-line no-case-declarations
                const newPlayerTurn =
                    (getState('playerTurn') + 1) % players.length;
                if (newPlayerTurn === getState('playerStart')) {
                    // EVERY PLAYER PLAYED
                    if (getState('round') === NB_ROUNDS) {
                        // END OF GAME
                        console.log('End of game');
                        let maxGems = 0;
                        players.forEach((player) => {
                            if (player.getState('gems') > maxGems) {
                                maxGems = player.getState('gems');
                            }
                        });
                        players.forEach((player) => {
                            player.setState(
                                'winner',
                                player.getState('gems') === maxGems,
                                true,
                            );
                            player.setState('cards', [], true);
                        });
                        setPhase('end', true);
                    } else {
                        // NEXT ROUND
                        console.log('Next round');
                        const newPlayerStart =
                            (getState('playerStart') + 1) % players.length; // we change the player who starts
                        setPlayerStart(newPlayerStart, true);
                        setPlayerTurn(newPlayerStart, true);
                        setRound(getState('round') + 1, true);
                        distributeCards(1); // we give one new card to each player
                        setPhase('cards', true);
                        newTime = TIME_PHASE_CARDS;
                    }
                } else {
                    // NEXT PLAYER
                    console.log('Next player');
                    setPlayerTurn(newPlayerTurn, true);
                    if (getCard() === 'punch') {
                        setPhase('playerChoice', true);
                        newTime = TIME_PHASE_PLAYER_CHOICE;
                    } else {
                        performPlayerAction();
                        setPhase('playerAction', true);
                        newTime = TIME_PHASE_PLAYER_ACTION;
                    }
                }
                break;
            default:
                break;
        }
        setTimer(newTime, true);
    }, [
        distributeCards,
        getCard,
        performPlayerAction,
        players,
        removePlayerCard,
        setPhase,
        setPlayerStart,
        setPlayerTurn,
        setRound,
        setTimer,
    ]);

    const { paused } = useControls({
        paused: false,
    });

    const timerInterval = useRef<number | undefined>(undefined);

    const runTimer = useCallback(() => {
        console.log('timerInterval :>> ', timerInterval);
        console.log('!timerInterval?.current :>> ', timerInterval.current);
        if (!timerInterval.current) {
            console.log('1 :>> ');
            timerInterval.current = setInterval(() => {
                console.log('setInterval :>> ');
                if (!isHost()) return;
                if (paused) return;
                console.log('newTime :>> ');
                const newTime = getState('timer') - 1;
                console.log('Timer', newTime);

                if (newTime <= 0) {
                    phaseEnd();
                } else {
                    setTimer(newTime, true);
                }
            }, 1000);
        }
    }, [paused, phaseEnd, setTimer]);

    // const clearTimer = () => {
    //     console.log('clearTimerBefore :>> ', timerInterval.current);
    //     if (timerInterval.current) {
    //         clearInterval(timerInterval.current);
    //         console.log('clear :>> ');
    //     }
    //     console.log('clearTimerAfter :>> ', timerInterval.current);
    // };

    // useEffect(() => {
    //     runTimer();
    //     return clearTimer;
    // }, [runTimer, phase]);

    useEffect(() => {
        if (phase === 'lobby') {
            startGame();
        } else {
            runTimer();
        }
        // return () => clearTimer();
    }, [phase, runTimer, startGame]);

    useEffect(() => {
        if (phase === 'cards' && isHost()) {
            console.log('restart :>> ');
            onPlayerJoin((player) => {
                console.log('player :>> ', player);
                // startGame();
            });
        }
    }, [phase, startGame]);

    console.log('phase :>> ', phase);
    return (
        <GameEngineContext.Provider
            value={{
                ...gameState,
                startGame,
                getCard,
            }}
        >
            {children}
        </GameEngineContext.Provider>
    );
};

export const useGameEngine = () => {
    const context = React.useContext(GameEngineContext);
    if (context === undefined) {
        throw new Error(
            'useGameEngine must be used within a GameEngineProvider',
        );
    }
    return context;
};
