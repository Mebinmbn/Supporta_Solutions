import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    Id: { type: mongoose.Types.ObjectId, auto: true },
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowecase: true },
    password: { type: String, required: true },
    profile_photo: { type: String },
    blockedUsers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  },
  {
    Timestamp: true,
  }
);

const User = mongoose.model("User", userSchema);

export default User;
