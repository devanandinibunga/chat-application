import axios from "axios";
import React, { useState } from "react";

export const Register = () => {
  const [data, setData] = useState({
    username: "",
    email: "",
    password: "",
    confirmpassword: "",
  });
  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:4000/register", data)
      .then((res) => alert(res.data));
  };
  return (
    <div>
      <center>
        <form onSubmit={handleSubmit}>
          <h3>Register</h3>
          <input
            type="text"
            onChange={handleChange}
            placeholder="username"
            name="username"
          />
          <br />
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
          <input
            type="password"
            placeholder="confirmpassword"
            name="confirmpassword"
            onChange={handleChange}
          />
          <br />
          <input type="submit" value="register" />
        </form>
      </center>
    </div>
  );
};
