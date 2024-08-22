import User from "../models/User.js";
import { jwtVerify } from "../utils/jwtUtils.js";

export const jwtAuthenticate = async (req, res, next) => {
  const token = req.cookies.userAuth;

  if (!token) {
    return res.status(401).json({
      message: `User not authorized!`,
    });
  }

  try {
    // Verification
    const jwtDecoded = jwtVerify(token);

    const user = await User.findById(jwtDecoded.id);

    if (!user) {
      return res
        .status(401)
        .cookie("userAuth", "none", {
          maxAge: 1000,
        })
        .json({
          message: "User not authorized!",
        });
    }

    req.userConsumer = user;

    next();
  } catch (err) {
    console.log(err);
  }
};
