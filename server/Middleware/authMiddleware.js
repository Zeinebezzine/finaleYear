const jwt = require("jsonwebtoken");

exports.authMiddleware = async (req, res, next) => {
  const token = req.header("auth-token");
  try {
    if (!token) {
      return res.status(401).json({ message: "You are not authorized" });
    }
    const verifiedToken = await jwt.verify(token, "jwtSecret");
    if (!verifiedToken) {
      return res.status(401).json({ message: "Invalid token" });
    }
    req.user = verifiedToken;
    next();
  } catch (error) {
    console.error("Error verifying token:", error);
    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({ message: "Invalid token" });
    } else if (error.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Token expired" });
    } else {
      return res.status(500).json({ message: "Something went wrong" });
    }
  }
};
