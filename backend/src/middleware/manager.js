const managerMiddleware = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ message: "Unauthorized. Please log in." });
  }

  const role = req.user.role;

  // Cho phép cả ADMIN và MANAGER đi qua
  if (role === "ADMIN" || role === "MANAGER") {
    next();
  } else {
    return res.status(403).json({ message: "Access denied. Managers or Admins only." });
  }
};

module.exports = managerMiddleware;