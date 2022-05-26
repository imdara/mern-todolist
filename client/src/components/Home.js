import { useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { setName } from "../app/nameSlice";
import { setTodos } from "../app/todosSlice";
import { setTodo, clearTodo } from "../app/todoSlice";
import Todo from "./Todo";

const Home = () => {
  const dispatch = useDispatch();
  const name = useSelector((state) => state.name.value);
  const token = useSelector((state) => state.token.value);
  const todo = useSelector((state) => state.todo.value);
  const todos = useSelector((state) => state.todos.value);
  const notify = (message) => toast(message);

  const addHandler = async (e) => {
    e.preventDefault();
    const res = await axios.post(
      "http://localhost:4000/api/todos",
      { todo },
      {
        headers: { authorization: token },
      }
    );
    const data = await res.data;
    dispatch(clearTodo());
    notify(data);
  };

  const getTodos = async () => {
    const res = await axios.get("http://localhost:4000/api/todos", {
      headers: { authorization: token },
    });
    const data = await res.data;
    dispatch(setName(data.name));
    dispatch(setTodos(data.todos));
  };

  useEffect(() => {
    getTodos();
  });

  return (
    <section class="text-gray-600 body-font">
      {name && (
        <h2 class="text-l lg:text-2xl font-bold text-center text-sky-500 bg-slate-100 p-2">
          Welcome {name}
        </h2>
      )}
      <div class="h-100 w-full flex items-center justify-center bg-teal-lightest font-sans">
        <div class="bg-white rounded shadow p-6 m-4 w-full lg:w-3/4 lg:max-w-lg">
          <div class="mb-4">
            <h1 class="text-grey-darkest">Todo List</h1>
            <ToastContainer />
            <div class="flex mt-4">
              <input
                class="shadow appearance-none border rounded w-full py-2 px-3 mr-4 text-grey-darker"
                placeholder="Add Todo"
                value={todo}
                onChange={(e) => dispatch(setTodo(e.target.value))}
                required
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-10 w-10 cursor-pointer text-sky-500 hover:text-slate-700"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
                onClick={addHandler}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4v16m8-8H4"
                />
              </svg>
            </div>
          </div>
          <div>
            {todos && (
              <>
                {todos.map((item, idx) => (
                  <Todo
                    id={item._id}
                    todo={item.todo}
                    status={item.status}
                    key={idx + 1}
                  />
                ))}
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;
