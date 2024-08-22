import User from "../models/User.js";
import { jwtSend } from "../utils/jwtUtils.js";
import { comparePasswordWithHash } from "../utils/bcryptUtils.js";

// @desc    Login User
// @route   POST api/v1/auth
// @access  Public
export const userLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({
        message: `Please enter valid credentials`,
      });
    }

    const user = await User.findOne({ email: email }).select("password _id");

    if (!user) {
      return res.status(401).json({
        message: `Invalid credentials`,
      });
    }
    console.log("user", user);

    const credMatch = await comparePasswordWithHash(password, user.password);
    console.log("credMatch", credMatch, req.cookies);
    if (credMatch) {
      jwtSend(user, "USER", res);
    } else {
      res.status(401).json({
        message: `Invalid credentials`,
      });
    }
  } catch (err) {
    console.log(err);
  }
};

// @desc    Logout User
// @route   POST api/v1/auth
// @access  Public
export const userLogout = async (req, res, next) => {
  try {
    res
      .status(200)
      .cookie("userAuth", "none", {
        maxAge: 1000,
      })
      .json({
        message: "Successfully Logged Out",
      });
  } catch (err) {
    console.log(err);
  }
};
