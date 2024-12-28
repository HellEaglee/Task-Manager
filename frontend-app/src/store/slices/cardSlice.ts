import { createSlice } from "@reduxjs/toolkit";

interface CardsState {
  refresh: boolean;
}

const initialState: CardsState = {
  refresh: false,
};

const cardsSlice = createSlice({
  name: "cards",
  initialState,
  reducers: {
    toggleRefresh(state) {
      state.refresh = !state.refresh;
    },
  },
});

export const { toggleRefresh } = cardsSlice.actions;

export default cardsSlice.reducer;
