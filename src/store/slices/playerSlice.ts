// src/store/slices/playerSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface ICard {
    id: number;
    name: string;
    position: [number, number, number];
}

interface PlayerState {
    playerHand: ICard[];
    opponentHand: ICard[];
    playerDeck: ICard[];
    opponentDeck: ICard[];
    playerGraveyard: ICard[];
    opponentGraveyard: ICard[];
    firstPlayer: 'player' | 'opponent' | null;
    selectedCard: ICard | null;
    dragging: boolean;
}

const initialState: PlayerState = {
    playerHand: [],
    opponentHand: [],
    playerDeck: [],
    opponentDeck: [],
    playerGraveyard: [],
    opponentGraveyard: [],
    firstPlayer: null,
    selectedCard: null,
    dragging: false,
};

const playerSlice = createSlice({
    name: 'player',
    initialState,
    reducers: {
        setPlayerHand(state, action: PayloadAction<ICard[]>) {
            state.playerHand = action.payload;
        },
        setOpponentHand(state, action: PayloadAction<ICard[]>) {
            state.opponentHand = action.payload;
        },
        setPlayerDeck(state, action: PayloadAction<ICard[]>) {
            state.playerDeck = action.payload;
        },
        setOpponentDeck(state, action: PayloadAction<ICard[]>) {
            state.opponentDeck = action.payload;
        },
        setPlayerGraveyard(state, action: PayloadAction<ICard[]>) {
            state.playerGraveyard = action.payload;
        },
        setOpponentGraveyard(state, action: PayloadAction<ICard[]>) {
            state.opponentGraveyard = action.payload;
        },
        setFirstPlayer(
            state,
            action: PayloadAction<'player' | 'opponent' | null>,
        ) {
            state.firstPlayer = action.payload;
        },
        setSelectedCard(state, action: PayloadAction<ICard | null>) {
            state.selectedCard = action.payload;
        },
        setDragging(state, action: PayloadAction<boolean>) {
            state.dragging = action.payload;
        },
    },
});

export const {
    setPlayerHand,
    setOpponentHand,
    setFirstPlayer,
    setSelectedCard,
    setDragging,
    setPlayerDeck,
    setOpponentDeck,
    setPlayerGraveyard,
    setOpponentGraveyard,
} = playerSlice.actions;

export default playerSlice.reducer;
