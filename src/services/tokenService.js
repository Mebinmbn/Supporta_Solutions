import jwt from "jsonwebtoken";
import { config } from "dotenv";
config();

export const generateToken = (user) => {
  const payload = { id: user.id, userName: user.userName };
  const secret = process.env.TOKEN_KEY;

  const token = jwt.sign(payload, secret, { expiresIn: "30m" });
  return token;
};

export const generateRefreshToken = (user) => {
  const payload = { id: user.id, userName: user.userName };
  const secret = process.env.REFRESH_TOKEN_KEY;

  const refreshToken = jwt.sign(payload, secret, { expiresIn: "7d" });
  return refreshToken;
};
