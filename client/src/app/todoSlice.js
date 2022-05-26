import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: "",
};

export const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    setTodo: (state, action) => {
      state.value = action.payload;
    },
    clearTodo: (state) => {
      state.value = "";
    },
  },
});

// Action creators are generated for each case reducer function
export const { setTodo, clearTodo } = todoSlice.actions;

export default todoSlice.reducer;
