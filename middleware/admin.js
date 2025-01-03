import User from "../models/User.js";

export const verifyAdmin = async (req, res, next) => {
  const email = req.decoded.email;
  const user = await User.findOne({ email });
  if (!user || user.role !== "admin") {
    return res.status(403).send('Forbidden: Not an admin');
  }
  next();
};
