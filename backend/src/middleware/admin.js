const adminMiddleware = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ message: "Unauthorized. Please log in." });
  }

  // Chỉ cho phép duy nhất ADMIN đi qua
  if (req.user.role === "ADMIN") {
    next();
  } else {
    return res.status(403).json({ message: "Access denied. Admins only." });
  }
};

module.exports = adminMiddleware;