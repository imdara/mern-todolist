import { useSelector, useDispatch } from "react-redux";
import { setUser } from "../app/userSlice";
import { setMessage } from "../app/messageSlice";
import { show, hide } from "../app/showSlice";
import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { ExclamationIcon, CheckIcon } from "@heroicons/react/outline";
import axios from "axios";
import Cookies from "universal-cookie";

const cookies = new Cookies();

const Login = () => {
  const dispatch = useDispatch();
  const message = useSelector((state) => state.message.value);
  const showStatus = useSelector((state) => state.showStatus.value);
  const user = useSelector((state) => state.user.value);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:4000/api/auth/login",
        user
      );
      const data = await res.data;
      dispatch(setMessage(data.message));
      if (data.token) {
        const token = "Bearer " + data.token;
        cookies.set("token", token, { path: "/", maxAge: 1000 * 60 * 60 * 24 });
        dispatch(show());
      } else dispatch(show());
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <Transition.Root show={showStatus} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          onClose={() => dispatch(hide())}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed z-10 inset-0 overflow-y-auto">
            <div className="flex items-center sm:items-center justify-center min-h-full p-4 text-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-lg sm:w-full">
                  <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                    <div className="sm:flex sm:items-start">
                      <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                        {message === "User logged in successfully" ||
                        message === "User signed up successfully" ? (
                          <CheckIcon
                            className="h-6 w-6 text-red-600"
                            aria-hidden="true"
                          />
                        ) : (
                          <ExclamationIcon
                            className="h-6 w-6 text-red-600"
                            aria-hidden="true"
                          />
                        )}
                      </div>
                      <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                        <Dialog.Title
                          as="h3"
                          className="text-lg leading-6 font-medium text-gray-900"
                        >
                          {message === "User logged in successfully"
                            ? "Welcome"
                            : "Account Signin"}
                        </Dialog.Title>
                        <div className="mt-2">
                          <p className="text-sm text-gray-500">{message}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                    {message === "User logged in successfully" ? (
                      <a
                        href="/"
                        className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                        onClick={() => dispatch(hide())}
                      >
                        Go to Homepage
                      </a>
                    ) : (
                      <button
                        type="button"
                        className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                        onClick={() => dispatch(hide())}
                      >
                        OK
                      </button>
                    )}
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
      <div class="flex justify-center">
        <div class="py-6 px-8 h-80 mt-20 bg-white rounded shadow-xl">
          <form onSubmit={submitHandler}>
            <div class="mb-6">
              <label for="email" class="block text-sky-800 font-bold">
                Email:
              </label>
              <input
                type="text"
                name="email"
                id="email"
                placeholder="@email"
                class="w-full border border-sky-300 py-2 pl-3 rounded mt-2 outline-none"
                onChange={(e) =>
                  dispatch(setUser({ ...user, email: e.target.value }))
                }
                required
              />
            </div>

            <div>
              <label for="password" class="block text-sky-800 font-bold">
                Password:
              </label>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="password"
                class="w-full border border-sky-300 py-2 pl-3 rounded mt-2 outline-none"
                onChange={(e) =>
                  dispatch(setUser({ ...user, password: e.target.value }))
                }
                required
              />
            </div>

            <button
              type="submit"
              class="cursor-pointer py-2 px-4 block mt-6 bg-sky-500 text-white font-bold w-full text-center rounded hover:bg-sky-300 hover:text-sky-600"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
