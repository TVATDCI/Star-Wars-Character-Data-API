import jwt from "jsonwebtoken";

//NOTE: This middleware function is a standalone function to check if the user is authenticated or not.
//NOTE:dotenv.config();has not been called any where else in this application.
//# Since it will be used in app.js. there is no need to import dotenv here.
// # It is already imported in app.js.

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.sendStatus(401).json({ error: "Access denied" });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.sendStatus(403).json({ error: "Invalid token" });
    }
    // Attach user information to the request object
    req.user = user;
    next();
  });
};
export default authenticateToken;
