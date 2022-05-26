import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: [],
};

export const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    setTodos: (state, action) => {
      state.value = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setTodos } = todosSlice.actions;

export default todosSlice.reducer;
