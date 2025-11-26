const jwt = require("jsonwebtoken");
const User = require("../models/user");

const tokenExtractor = (req, res, next) => {
  const authorization = req.get("authorization");
  if (authorization && authorization.startsWith("Bearer ")) {
    req.token = authorization.replace("Bearer ", "");
  }
  next();
};

const userExtractor = async (req, res, next) => {
  if (!req.token) return next();

  try {
    const decoded = jwt.verify(req.token, process.env.SECRET);
    req.user = await User.findById(decoded.id);
  } catch (error) {
    return res.status(401).json({ error: "invalid token" });
  }

  next();
};

module.exports = {
  tokenExtractor,
  userExtractor,
};
