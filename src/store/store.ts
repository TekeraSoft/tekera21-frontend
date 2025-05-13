import { configureStore } from "@reduxjs/toolkit";
import SellerCompanyReducer from "./sellerSlices/SellerCompanySlice";
import globalSettingsReducer from "./generalSlices/globalSettingsSlice";
import formControlReducer from "./generalSlices/formControlSlice";
import adminProductsReducer from "./superadminSlices/product/productSlice";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

export const store = configureStore({
  reducer: {
    SellerCompany: SellerCompanyReducer,
    formControl: formControlReducer,
    globalSettings: globalSettingsReducer,
    adminProducts: adminProductsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
