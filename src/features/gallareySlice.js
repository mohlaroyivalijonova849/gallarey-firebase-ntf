// redux/gallerySlice.js
import { createSlice } from "@reduxjs/toolkit";

const localValue = localStorage.getItem("liked")
  ? JSON.parse(localStorage.getItem("liked"))
  : [];

const mode = localStorage.getItem("mode")
  ? JSON.parse(localStorage.getItem("mode"))
  : [];

const initialState = {
  value: localValue,
  mode,
  user: null,
};

const html = document.documentElement;

const gallerySlice = createSlice({
  name: "like",
  initialState,
  reducers: {
    addLike: (state, { payload }) => {
      const filterValue = state.value.find((item) => {
        return item.id === payload.id;
      });
      if (!filterValue) {
        state.value.push(payload);
      }
    },
    removeLike: (state, { payload }) => {
      state.value = state.value.filter((item) => {
        return item.id !== payload.id;
      });
      localStorage.setItem("liked", JSON.stringify(state.value));
    },
    dark: (state) => {
      state.mode === "dark"
        ? ((state.mode = "light"),
          document.documentElement.setAttribute("data-theme", "dark"))
        : ((state.mode = "dark"),
          document.documentElement.setAttribute("data-theme", "dark"));
      localStorage.setItem("mode", JSON.stringify(state.mode));
    },
    userSetting: (state, { payload }) => {
      state.user = payload;
    },
  },
});

export const { addLike, removeLike, dark, userSetting } = gallerySlice.actions;
export default gallerySlice.reducer;
