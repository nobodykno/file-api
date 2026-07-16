import jwt, { JwtPayload } from "jsonwebtoken";
import dotenv from "dotenv";
import type { Request, Response, NextFunction } from "express";

dotenv.config();

interface AuthRequest extends Request {
  user?: string | JwtPayload;
}

const verifyToken = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Response | void => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({
      message: "No token provided!",
    });
  }

  const tokenWithoutBearer = token.replace("Bearer ", "");

  try {
    const decoded = jwt.verify(
      tokenWithoutBearer,
      process.env.JWT_SECRET!
    );

    req.user = decoded;

    next();
  } catch {
    return res.status(401).json({
      message: "Invalid token!",
    });
  }
};

export default verifyToken;