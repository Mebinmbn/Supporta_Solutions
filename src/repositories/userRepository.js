import User from "../models/userModel.js";

const blockUser = async (userId, blockedUserId) => {
  return await User.findByIdAndUpdate(
    userId,
    { $addToSet: { blockedUsers: blockedUserId } },
    { new: true }
  );
};

const unblockUser = async (userId, blockedUserId) => {
  return await User.findByIdAndUpdate(
    userId,
    { $pull: { blockedUsers: blockedUserId } },
    { new: true }
  );
};

const getBlockedByUsers = async (userId) => {
  return await User.find({ blockedUsers: userId }).select("_id");
};

export default { blockUser, unblockUser, getBlockedByUsers };
