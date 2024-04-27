import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./slices/apiSlice";
import cartSliceReducer from './slices/cartSlice';
import authSliceReducer from "./slices/authSlice";
import saveSliceReducer from "./slices/saveSlice";

const store = configureStore({
    reducer: {
        [apiSlice.reducerPath] : apiSlice.reducer,
        cart: cartSliceReducer,
        auth: authSliceReducer,
        saved: saveSliceReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(
        apiSlice.middleware
    ),
    devTools: true,
});

export default store;