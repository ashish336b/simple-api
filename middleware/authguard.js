module.exports = async (req, res, next) => {
  let data = await verifyToken(req.headers.authorization);
  if (!data) {
    return res.status(200).json({ error: true, message: "unauthorized" });
  }
  req.authUserData = data.data;
  next();
};
var verifyToken = async (token) => {
  const jwt = require("jsonwebtoken");
  if (typeof token === "undefined") {
    return false;
  }
  var t = token.split(" ")[1];
  try {
    var authData = await jwt.verify(t, "asdfjsadkfjaslkfjasfasdfh");
    return authData;
  } catch (error) {
    return false;
  }
};
