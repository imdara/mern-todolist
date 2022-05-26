import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "./todoSlice";
import todosReducer from "./todosSlice";
import messageReducer from "./messageSlice";
import nameReducer from "./nameSlice";
import userReducer from "./userSlice";
import showReducer from "./showSlice";
import tokenReducer from "./tokenSlice";

const store = configureStore({
  reducer: {
    todo: todoReducer,
    todos: todosReducer,
    message: messageReducer,
    name: nameReducer,
    user: userReducer,
    showStatus: showReducer,
    token: tokenReducer,
  },
});

export default store;
