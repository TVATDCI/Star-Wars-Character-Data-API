const requireAdmin = (req, res, next) => {
  // Check if the user is authenticated and has the admin role
  if (req.user?.role !== "admin") {
    return res.status(403).json({ error: "Access denied. Admins only." });
  }
  next();
};

export default requireAdmin;
// The one above checks directly if the user is not = "admin".
// then it returns an error. Otherwise it calls next().!
// To compare with the one below is the other way around.
// NOTE: Alternative syntex:
// const requireAdmin = (req, res, next) => {
//     if (req.user && req.user.role === "admin") {
//         next();
//     } else {
//         res.status(403).json({ error: "Access denied. Admins only." });
//     }
// };
// export default requireAdmin;
