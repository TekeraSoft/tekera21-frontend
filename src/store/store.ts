import { configureStore } from "@reduxjs/toolkit";
import SellerUserReducer from "./SellerUserSlice";
import SellerCompanyReducer from "./SellerCompanySlice";
import globalSettingsReducer from "./globalSettingsSlice";

export const store = configureStore({
  reducer: {
    SellerUser: SellerUserReducer,
    SellerCompany: SellerCompanyReducer,
    globalSettings: globalSettingsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
