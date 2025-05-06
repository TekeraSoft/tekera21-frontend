import { configureStore } from "@reduxjs/toolkit";
import SellerUserReducer from "./SellerUserSlice";

export const store = configureStore({
  reducer: {
    SellerUser: SellerUserReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
