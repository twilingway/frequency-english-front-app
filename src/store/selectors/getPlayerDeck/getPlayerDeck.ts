import { RootState } from '../..';

export const getPlayerDeck = (state: RootState) => state?.player.playerDeck;
