import React from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import Add from "./pages/Add";
import List from "./pages/List";

import { useState } from "react";
import Login from "./components/Login";
import { useEffect } from "react";
import Order from "./pages/Order";

function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));

  useEffect(() => {
    localStorage.setItem("token", token);
  }, [token]);

  return (
    <div className="px-12">
      <ToastContainer />
      {token === "" ? (
        <Login setToken={setToken} />
      ) : (
        <>
          <Navbar setToken={setToken} />
          <div className="flex flex-row justify-between w-full">
            <Sidebar />
            <div className="w-full flex-1">
              <Routes>
                <Route path="/" element={<Add />} />
                <Route path="/add" element={<Add />} />
                <Route path="/list" element={<List />} />
                <Route path="/order" element={<Order />} />
              </Routes>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default App;
