// src/redux/slices/globalSettingsSlice.ts

import { createSlice } from "@reduxjs/toolkit";

interface GlobalState {
  logoUrl: string;
}

const initialState: GlobalState = {
  logoUrl: "/logo.svg",
};

const globalSettingsSlice = createSlice({
  name: "global",
  initialState,
  reducers: {},
});

export const {} = globalSettingsSlice.actions;

export default globalSettingsSlice.reducer;
