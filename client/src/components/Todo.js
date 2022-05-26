import axios from "axios";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";

const Todo = ({ todo, status, id }) => {
  const token = useSelector((state) => state.token.value);

  const notify = (message) => toast(message);

  const deleteHandler = async () => {
    const res = await axios.delete(`http://localhost:4000/api/todos/${id}`, {
      headers: { authorization: token },
    });
    const data = await res.data;
    notify(data);
  };

  const doneHandler = async () => {
    const res = await axios.put(
      `http://localhost:4000/api/todos/${id}`,
      { status: !status },
      {
        headers: { authorization: token },
      }
    );
    const data = await res.data;
    notify(data);
  };

  return (
    <div class="flex mb-4 items-center">
      <ToastContainer />
      <p class={status ? "w-full line-through" : "w-full text-grey-darkest"}>
        {todo}
      </p>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-8 w-8 cursor-pointer text-sky-500 hover:text-green-500"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
        onClick={doneHandler}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
        />
      </svg>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-8 w-8 cursor-pointer text-sky-500 hover:text-red-500"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
        onClick={deleteHandler}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
        />
      </svg>
    </div>
  );
};

export default Todo;
