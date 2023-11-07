import { configureStore } from "@reduxjs/toolkit";
import galleryReducer from "../../features/gallareySlice";

export const store = configureStore({
  reducer: {
    like: galleryReducer,
  },
});
