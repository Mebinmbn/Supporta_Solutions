import User from "../models/userModel.js";

const isExistingUser = async (email) => {
  try {
    const user = await User.findOne({ email });
    return user;
  } catch (error) {
    throw new Error("Error in checking existing user");
  }
};

const registerUser = async (username, email, password, filePath) => {
  try {
    const userData = {
      username,
      email,
      password,
      profile_photo: filePath,
    };
    const newUser = new User(userData);
    newUser.save();
    console.log(newUser);
    return newUser;
  } catch (error) {
    throw new Error("Error in registering user");
  }
};

export default { isExistingUser, registerUser };
