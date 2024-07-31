import React, { useContext, useEffect, useState } from "react";
import { store } from "../App";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const MyProfile = () => {
  const [token, setToken] = useContext(store);
  const [data, setData] = useState([]);
  const [allMsg, setAllMsg] = useState([]);
  const [msg, setMsg] = useState("");

  const navigate = useNavigate();
  useEffect(() => {
    if (!token) {
      return navigate("/login");
    }
    axios
      .get("http://localhost:4000/MyProfile", {
        headers: {
          "x-token": token,
        },
      })
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
    axios
      .get("http://localhost:4000/getMsg", {
        headers: {
          "x-token": token,
        },
      })
      .then((res) => setAllMsg(res.data))
      .catch((err) => console.log(err));
  }, [token]);
  console.log(allMsg);
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(
        "http://localhost:4000/addMsg",
        { text: msg },
        {
          headers: {
            "x-token": token,
          },
        },
      )
      .then((res) => {
        setAllMsg(res.data);
        setMsg("");
      })
      .catch((err) => console.log(err));
  };
  return (
    <div>
      {data && (
        <center>
          Welcome {data.username}
          <br />
          <div style={{ width: "500px" }}>
            {allMsg?.length >= 1 ? (
              allMsg?.map((msg) => (
                <div
                  style={{
                    width: "300px",
                    textAlign:
                      data.username === msg.username ? "right" : "left",
                    border: "1px solid black",
                    margin: "5px",
                    padding: "5px",
                  }}
                >
                  <h5 style={{ margin: "0" }}>{msg.username}</h5>
                  <p style={{ margin: "2px" }}>{msg.text}</p>
                </div>
              ))
            ) : (
              <p>Loading..</p>
            )}
          </div>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Enter text here"
              onChange={(e) => setMsg(e.target.value)}
              value={msg}
            />
            <input type="submit" value="send message" />
          </form>
          <hr />
          <button onClick={() => setToken(null)}>Logout</button>
        </center>
      )}
    </div>
  );
};
