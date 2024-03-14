const jwt = require("jsonwebtoken");
const jwtSecret =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+";

exports.authMiddleware = async (req, res, next) => {
  const token = req.header("Authorization");

  try {
    if (!token) {
      return res.status(401).json({ message: "You are not authorized" });
    }

    // Extract token from the "Bearer <token>" format
    const extractedToken = token.split(" ")[1];

    const verifiedToken = jwt.verify(extractedToken, jwtSecret);

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
