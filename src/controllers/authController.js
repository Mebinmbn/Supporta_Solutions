import authUseCases from "../useCases/authUseCases.js";

const register = async (req, res) => {
  try {
    if (!req.file) {
      throw new Error("Profil-photo required");
    }
    const { username, email, password } = userData;
    if (!username || !email || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }
    const filepath = req.file.path;

    const response = await authUseCases.registerUseCase(
      username,
      email,
      password,
      filepath
    );
    if (response) {
      res.status(200).json({
        success: "true",
        response,
        message: "User registered successfully",
      });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const login = async (req, res) => {
  try {
    let { email, password } = req.body;
    const { token, refreshToken, user } = await authUseCases.loginUseCase(
      email,
      password
    );
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true,
      samesite: "none",
      maxAge: 1 * 24 * 60 * 60 * 1000,
    });
    res.status(200).json({
      success: true,
      token,
      user,
      message: "User signed in successfully",
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const refreshToken = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    console.log("Received refreshToken:", refreshToken);
    if (!refreshToken) {
      res
        .status(401)
        .json({ success: false, message: "No refresh token provided" });
      return;
    }

    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_KEY, (err, user) => {
      if (err) {
        console.error("Error verifying refresh token:", err);
        res
          .status(403)
          .json({ success: false, message: "Invalid refresh token" });
        return;
      }

      const token = generateToken(user.id, user.role, user.isBlocked);
      res.json({ token });
    });
  } catch (error) {
    console.error("Error in refreshtoken function:", error);
    res.status(400).json({ success: false, message: "An error occurred" });
  }
};

export default { register, login, refreshToken };
