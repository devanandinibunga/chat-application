const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  try {
    let token = req.header("x-token");
    if (!token) {
      return res.status(500).send("Token not found");
    }
    let decode = jwt.verify(token, "jwtSecure");
    req.user = decode.user;
    next();
  } catch (err) {
    console.log(err.message);
    return res.status(500).send("Invalid token");
  }
};
