var jwt = require("jsonwebtoken");
const secret = "heisagoodboy";
const fetchUser = (req, res, next) => {
  const token = req.header("auth-token");
  if (!token) return res.status(401).send("unauthorized");
  try {
    const data = jwt.verify(token, secret);
    req.user = data.user;
    next();
  } catch (error) {
    res.status(400).send("Invalid Token");
  }
};
module.exports = fetchUser;
