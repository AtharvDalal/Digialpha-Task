export const checkRole = (requiredRole) => {
  return (req, res, next) => {
    const userRole = req.user?.role;

    if (userRole !== requiredRole) {
      return res.status(403).json({
        message: "This User Don't Have a Permmsion to access this route",
      });
    }

    next();
  };
};

export const checkReadOnlyAccess = (req, res, next) => {
  const userRole = req.user.role?.name;

  if (userRole === "admin") {
    return next();
  }

  return res
    .status(403)
    .json({ message: "Forbidden: You only have read access" });
};
