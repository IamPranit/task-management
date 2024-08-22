import bcrypt from "bcrypt";
const saltRounds = 10;

export const hashPassword = async (password) => {
  try {
    return await bcrypt.hash(password, saltRounds);
  } catch (err) {
    console.log(err);
  }
};

export const comparePasswordWithHash = async (
  receivedPassword,
  hashedPassword
) => {
  try {
    return await bcrypt.compare(receivedPassword, hashedPassword);
  } catch (error) {
    throw error;
  }
};
