import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setToken } from "../app/tokenSlice";
import { setName } from "../app/nameSlice";
import Cookies from "universal-cookie";

const cookies = new Cookies();

const NavigationDrawer = () => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token.value);

  const logoutHandler = () => {
    cookies.remove("token");
    dispatch(setToken(null));
    dispatch(setName(null));
  };

  return (
    <header class="w-screen text-white bg-sky-500">
      <nav>
        <div>
          <div class="flex justify-between h-16 px-10 shadow items-center">
            <div class="flex items-center space-x-8">
              <Link to="/" class="text-xl lg:text-2xl font-bold cursor-pointer">
                My site
              </Link>
            </div>
            <div class="flex space-x-4 items-center">
              {!token ? (
                <>
                  <Link to="/login" class="text-white font-medium text-sm">
                    LOGIN
                  </Link>
                  <Link
                    to="/signup"
                    class="bg-white font-medium px-4 py-2 rounded text-slate-700 hover:bg-sky-300 hover:text-slate-50 text-sm"
                  >
                    SIGNUP
                  </Link>
                </>
              ) : (
                <button
                  class="bg-white font-medium px-4 py-2 rounded text-slate-700 hover:bg-sky-300 hover:text-slate-50 text-sm"
                  onClick={logoutHandler}
                >
                  LOGOUT
                </button>
              )}
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default NavigationDrawer;
