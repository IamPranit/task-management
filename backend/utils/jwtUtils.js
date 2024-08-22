import jwt from "jsonwebtoken";

// Sign token and return Signed token
export const jwtSignToken = async (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

// Send JWT
export const jwtSend = async (currentUser, userType, res) => {
  try {
    // Signed JWT / Create JWT
    const token = await jwtSignToken(currentUser._id);

    res
      .status(200)
      .cookie("userAuth", token, {
        maxAge: 24 * 60 * 60 * 1000,
      })
      .json({
        success: true,
        token,
      });
  } catch (err) {
    console.log(err);
  }
};

// Verify JWT
export const jwtVerify = (receivedToken) => {
  try {
    return jwt.verify(receivedToken, process.env.JWT_SECRET);
  } catch (err) {
    return err;
  }
};
