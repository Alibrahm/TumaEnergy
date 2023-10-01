import React, { useContext } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import List from "./pages/list/List";
import { DarkModeContext } from "./context/darkModeContext";
import Signin from "./pages/login/Login";
import { productInputs, userInputs } from "./formSource";
import Orders from "./pages/order/Orders";
import Otp from "./pages/otp/Otp";



function App() {
  const { darkMode } = useContext(DarkModeContext);
  const token = localStorage.getItem("token");

  return (
    <div className={darkMode ? "app dark" : "app"}>
      <BrowserRouter>
        <Routes>
        <Route index element={<Signin />} />
          {token && (
            <Route path="skizatunes">
              <Route path="skizatunes" element={<Home />} />
              <Route index element={<List />} />
              {/* <Route
                path="new"
                element={<New inputs={userInputs} title="Add Tune" />}
              /> */}
               <Route
                path="orders"
                element={<Orders/>}
              />
              <Route
                path="otps"
                element={<Otp/>}
              />
              
            </Route>
          )}
          {/* <Route path="*" element={<Login />} /> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;