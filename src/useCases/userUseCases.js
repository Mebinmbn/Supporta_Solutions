import userRepository from "../repositories/userRepository.js";

const blockUserUseCase = async (userId, blockedUserId) => {
  if (userId === blockedUserId) {
    throw new Error("You cannot block yourself.");
  }
  return await userRepository.blockUser(userId, blockedUserId);
};

const unblockUserUseCase = async (userId, blockedUserId) => {
  return await userRepository.unblockUser(userId, blockedUserId);
};

export default { blockUserUseCase, unblockUserUseCase };
