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
