import { configureStore } from "@reduxjs/toolkit";
import authReducer from './features/auth/authSlice';
import foodReducer from './features/food/foodSlice';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        food: foodReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;