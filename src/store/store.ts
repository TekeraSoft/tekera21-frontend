import { configureStore } from "@reduxjs/toolkit";
import SellerCompanyReducer from "./sellerSlices/SellerCompanySlice";
import globalSettingsReducer from "./generalSlices/globalSettingsSlice";
import formControlReducer from "./generalSlices/formControlSlice";
import adminProductsReducer from "./superadminSlices/product/productSlice";
import buyerProductReducer from "./buyerSlices/product/productSlice";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import SellerRequestsReducer from "./sellerSlices/SellerRequestsSlice";
import DigitalFashionBuyerProductsReducer from "./digitalfashionSlices/product/productSlice";
import DigitalFashionBuyerFilterReducer from "./digitalfashionSlices/filter/filterSlice";

export const store = configureStore({
  reducer: {
    SellerCompany: SellerCompanyReducer,
    SellerRequests: SellerRequestsReducer,
    DigitalFashionProducts: DigitalFashionBuyerProductsReducer,
    DigitalFashionFilter: DigitalFashionBuyerFilterReducer,
    formControl: formControlReducer,
    globalSettings: globalSettingsReducer,
    adminProducts: adminProductsReducer,
    buyerProducts: buyerProductReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
