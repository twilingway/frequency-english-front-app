import { RootState } from '../..';

export const getOpponentHand = (state: RootState) => state?.player.opponentHand;
