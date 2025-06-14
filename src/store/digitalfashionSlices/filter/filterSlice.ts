import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Product arayüzü
interface FilterSortState {
  selectedColors: string[];
  sortBy: string | null;
}

const initialState: FilterSortState = {
  selectedColors: [],
  sortBy: "featured",
};

const DigitalFashionBuyerFilterSlice = createSlice({
  name: "digitalFashionBuyerFilter",
  initialState,
  reducers: {
    toggleColor: (state, action: PayloadAction<string>) => {
      const color = action.payload;
      if (state.selectedColors.includes(color)) {
        state.selectedColors = state.selectedColors.filter((c) => c !== color);
      } else {
        state.selectedColors.push(color);
      }
    },
    clearFilters: (state) => {
      state.selectedColors = [];
      state.sortBy = null;
    },
    setSortBy: (state, action: PayloadAction<string | null>) => {
      state.sortBy = action.payload;
    },
  },
});

// Export actions ve reducer
export const { toggleColor, clearFilters, setSortBy } =
  DigitalFashionBuyerFilterSlice.actions;

export default DigitalFashionBuyerFilterSlice.reducer;
