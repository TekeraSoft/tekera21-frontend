import { configureStore } from "@reduxjs/toolkit";
import SellerUserReducer from "./SellerUserSlice";
import SellerCompanyReducer from "./SellerCompanySlice";
import globalSettingsReducer from "./globalSettingsSlice";
import formControlReducer from "./formControlSlice";
import UserReducer from "./UserSlice";

export const store = configureStore({
  reducer: {
    SellerUser: SellerUserReducer,
    User: UserReducer,
    SellerCompany: SellerCompanyReducer,
    formControl: formControlReducer,
    globalSettings: globalSettingsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
