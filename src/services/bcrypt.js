import bcrypt from "bcrypt";

const saltRounds = 10;

export const hashPassword = async (password) => {
  try {
    console.log("bcrypt", password);
    return await bcrypt.hash(password, saltRounds);
  } catch (error) {
    console.log(error);
  }
};
