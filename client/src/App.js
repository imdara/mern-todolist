import { Route, Routes, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import NavigationDrawer from "./components/NavigationDrawer";
import Home from "./components/Home";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Notfound from "./components/Notfound";
import Footer from "./components/Footer";

const App = () => {
  const token = useSelector((state) => state.token.value);

  return (
    <div className="App">
      <div class="h-[90vh]">
        <NavigationDrawer />
        <Routes>
          <Route index element={token ? <Home /> : <Login />} />
          <Route
            path="/signup"
            element={token ? <Navigate replace to="/" /> : <Signup />}
          />
          <Route
            path="/login"
            element={token ? <Navigate replace to="/" /> : <Login />}
          />
          <Route path="*" element={<Notfound />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
};

export default App;
