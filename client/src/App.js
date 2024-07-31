import "./App.css";
import React, { createContext, useState } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { Register } from "./components/Register";
import { Login } from "./components/Login";
import { MyProfile } from "./components/MyProfile";
import { Navbar } from "./components/Navbar";


export const store = createContext();
function App() {
  const [token, setToken] = useState(null);
  return (
    <div>
      <store.Provider value={[token, setToken]}>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/register" element={<Register />} exact />
            <Route path="/login" element={<Login />} exact />
            <Route path="/myProfile" element={<MyProfile />} exact />
          </Routes>
        </Router>
      </store.Provider>
    </div>
  );
}

export default App;
