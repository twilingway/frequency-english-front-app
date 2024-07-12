// src/store/slices/lineSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Card {
    id: number;
    name: string;
    position: [number, number, number];
}

interface LineState {
    line1Objects: Card[];
    line2Objects: Card[];
}

const initialState: LineState = {
    line1Objects: [],
    line2Objects: [],
};

const lineSlice = createSlice({
    name: 'line',
    initialState,
    reducers: {
        setLine1Objects(state, action: PayloadAction<Card[]>) {
            state.line1Objects = action.payload;
        },
        setLine2Objects(state, action: PayloadAction<Card[]>) {
            state.line2Objects = action.payload;
        },
    },
});

export const { setLine1Objects, setLine2Objects } = lineSlice.actions;

export default lineSlice.reducer;
