// src/store/slices/lineSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Card {
    id: number;
    name: string;
    position: [number, number, number];
}

interface LineState {
    playerLine1: Card[];
    playerLine2: Card[];
    opponentLine1: Card[];
    opponentLine2: Card[];
}

const initialState: LineState = {
    playerLine1: [],
    playerLine2: [],
    opponentLine1: [],
    opponentLine2: [],
};

const lineSlice = createSlice({
    name: 'line',
    initialState,
    reducers: {
        setPlayerLine1(state, action: PayloadAction<Card[]>) {
            state.playerLine1 = action.payload;
        },
        setPlayerLine2(state, action: PayloadAction<Card[]>) {
            state.playerLine2 = action.payload;
        },
        setOpponentLine1(state, action: PayloadAction<Card[]>) {
            state.opponentLine1 = action.payload;
        },
        setOpponentLine2(state, action: PayloadAction<Card[]>) {
            state.opponentLine2 = action.payload;
        },
    },
});

export const { setPlayerLine1, setPlayerLine2 } = lineSlice.actions;

export default lineSlice.reducer;
