const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const middleware = require("./middleware");
const chat = require("./model/chatmodel");
const RegistrationSchema = require("./model/loginmodel");

const app = express();
app.use(express.json());
app.use(cors());
mongoose
  .connect(
    "mongodb+srv://devanandini205:nandini402@cluster0.vllqbgr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
  )
  .then(() => console.log("DB connected"));

//Login authentication api's
app.get("/", (req, res) => {
  res.send("Hello Nandini");
});
app.post("/register", async (req, res) => {
  const { username, email, password, confirmpassword } = req.body;
  try {
    const exist = await RegistrationSchema.findOne({ email });
    if (exist) {
      return res.status(400).send("User already exist!!");
    }
    if (password !== confirmpassword) {
      return res.status(400).send("Password mismatched");
    }
    const newuser = new RegistrationSchema({
      username,
      email,
      password,
      confirmpassword,
    });
    await newuser.save();
    return res.status(200).send("Registered successfully!!");
  } catch (err) {
    res.status(500).send(err.message);
  }
});
app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const exist = await RegistrationSchema.findOne({ email });
    if (!exist) {
      return res.status(400).send("User not found");
    }
    if (exist.password !== password) {
      return res.status(400).send("Invalid credentials");
    }
    const payload = {
      user: {
        id: exist._id,
      },
    };
    jwt.sign(payload, "jwtSecure", { expiresIn: 3600000 }, (err, token) => {
      if (err) throw err;
      return res.json({ token });
    });
  } catch (err) {
    console.log(err.message);
    return res.status(500).send("Server error");
  }
});
app.get("/myProfile", middleware, async (req, res) => {
  try {
    let exist = await RegistrationSchema.findById(req.user.id);
    if (!exist) {
      return res.status(400).send("User not found");
    }
    return res.json(exist);
  } catch (err) {
    console.log(err.message);
  }
});

//Chat api's -- chat application continued using login
app.post("/addMsg", middleware, async (req, res) => {
  const { text } = req.body;
  try {
    let exist = await RegistrationSchema.findById(req.user.id);
    let msgData = new chat({
      text: text,
      username: exist.username,
      user: req.user.id,
    });
    await msgData.save();
    return res.json(await chat.find());
  } catch (err) {
    console.log(err.message);
    return res.status(500).send("Server error");
  }
});
app.get("/getMsg", middleware, async (req, res) => {
  try {
    return res.json(await chat.find());
  } catch (err) {
    console.log(err.message);
    return res.status(500).send("Server error");
  }
});

app.listen(4000, () => console.log("Server running..."));
