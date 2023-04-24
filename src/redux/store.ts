import { configureStore } from "@reduxjs/toolkit";
import cryptoSlice from "./cryptoSlice";
import { useDispatch } from "react-redux";


const store = configureStore({
  reducer:{
    crypto: cryptoSlice
  }
});

export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()

export type RootState = ReturnType<typeof store.getState>
export default store