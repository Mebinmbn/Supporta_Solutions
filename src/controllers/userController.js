import userUseCases from "../useCases/userUseCases.js";

const blockUser = async (req, res) => {
  try {
    const userId = req.user.id;
    const { blockedUserId } = req.body;

    await userUseCases.blockUserUseCase(userId, blockedUserId);

    res
      .status(200)
      .json({ success: true, message: "User blocked successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const unblockUser = async (req, res) => {
  try {
    const userId = req.user.id;
    const { blockedUserId } = req.body;

    await userUseCases.unblockUserUseCase(userId, blockedUserId);

    res
      .status(200)
      .json({ success: true, message: "User unblocked successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export default { blockUser, unblockUser };
