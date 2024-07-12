import { RootState } from '../..';

export const getOpponentDeck = (state: RootState) => state?.player.opponentDeck;
