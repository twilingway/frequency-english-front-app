import { isHost, myPlayer } from 'playroomkit';
import { NB_ROUNDS, useGameEngine } from '../../shared/hooks/useGameEngine';
import s from './UserInterface.module.scss';

export const UserInterface = () => {
    const {
        timer,
        round,
        phase,
        playerTurn,
        playerStart,
        players,
        gems,
        deck,
        actionSuccess,
        startGame,
        getCard,
    } = useGameEngine();

    const currentPlayer = players[playerTurn];
    const me = myPlayer();
    const currentCard = getCard();

    const target =
        phase === 'playerAction' &&
        currentCard === 'punch' &&
        playerStart[currentPlayer.getState('playerTarget')];

    let label = '';
    switch (phase) {
        case 'cards':
            label = 'Select the card you want to play';
            break;
        case 'playerChoice':
            label =
                currentPlayer.id === me.id
                    ? 'Select the player you want to punch'
                    : `${currentPlayer?.state.profile?.name} is going to punch someone`;
            break;
        case 'playerAction':
            switch (currentCard) {
                case 'punch':
                    label = actionSuccess
                        ? `${currentPlayer?.state.profile?.name} is punching ${target?.state.profile?.name}`
                        : `${currentPlayer?.state.profile?.name} failed punching ${target?.state.profile?.name}`;
                    break;
                case 'grab':
                    label = actionSuccess
                        ? `${currentPlayer?.state.profile?.name} is grabbing a gem`
                        : `NO more gems for${currentPlayer?.state.profile?.name}`;
                    break;
                case 'shield':
                    label = `${currentPlayer?.state.profile?.name} can't be punched until next turn`;
                    break;
                default:
                    break;
            }
            break;
        case 'end':
            label = 'Game over';
            break;
        default:
            break;
    }

    return (
        <div className={s.userInterface}>
            <div>
                <h2>
                    Round {round}/{NB_ROUNDS}
                </h2>
                <div>Иконка часы</div>
                <h2>{timer}</h2>
            </div>
            <div></div>
            <h1>{label}</h1>
            {phase === 'end' && (
                <p className="text-center">
                    Winner:{' '}
                    {players
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        .filter((player: any) => player.getState('winner'))
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        .map((player: any) => player.state.profile?.name)}
                </p>
            )}
            {isHost() && phase === 'end' && (
                <button onClick={startGame}>Start</button>
            )}
        </div>
    );
};
