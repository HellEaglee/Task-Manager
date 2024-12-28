import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { WorkplaceResponse } from "../../types/workplaceTypes";

interface WorkplacesState {
  workplaces: WorkplaceResponse[]; // Array to hold fetched workplaces
  loading: boolean;
  error?: string; // Optional error message
}

const initialState: WorkplacesState = {
  workplaces: [],
  loading: false,
  error: undefined,
};

const workplacesSlice = createSlice({
  name: "workplaces",
  initialState,
  reducers: {
    setWorkplaces(state, action: PayloadAction<WorkplaceResponse[]>) {
      state.workplaces = action.payload;
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    setError(state, action: PayloadAction<string | undefined>) {
      state.error = action.payload;
    },
    clearError(state) {
      state.error = undefined;
    },
  },
});

export const { setWorkplaces, setLoading, setError, clearError } =
  workplacesSlice.actions;

export default workplacesSlice.reducer;
