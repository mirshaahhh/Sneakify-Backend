const admin = (req, res, next) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ msg: "Admin only access" });
    }

    next();
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};

module.exports = admin;