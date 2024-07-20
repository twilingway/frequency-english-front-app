import { RootState } from '../..';

export const getSelectedCard = (state: RootState) => state?.player.selectedCard;
