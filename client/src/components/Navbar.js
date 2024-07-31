import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { store } from "../App";
import "../App.css";

export const Navbar = () => {
  const [token] = useContext(store);
  return (
    <div>
      {!token && (
        <ul className="nav-side-container">
          <Link to="/register">
            <li>Register</li>
          </Link>
          <Link to="/login">
            <li>Login</li>
          </Link>
        </ul>
      )}
    </div>
  );
};
