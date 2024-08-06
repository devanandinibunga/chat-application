import axios from "axios";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { store } from "../App";

export const Login = () => {
  const [token, setToken] = useContext(store);
  const navigate = useNavigate();
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(process.env.REACT_APP_SERVER_URL + "/login", data)
      .then((res) => setToken(res.data.token));
  };
  if (token) {
    return navigate("/MyProfile");
  }
  return (
    <div>
      <center>
        <form onSubmit={handleSubmit}>
          <h3>Login</h3>
          <input
            type="text"
            onChange={handleChange}
            placeholder="email"
            name="email"
          />
          <br />
          <input
            type="password"
            onChange={handleChange}
            placeholder="password"
            name="password"
          />
          <br />
          <input type="submit" value="Login" />
          <br />
        </form>
      </center>
    </div>
  );
};
