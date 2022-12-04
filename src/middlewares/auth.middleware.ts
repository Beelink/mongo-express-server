// utils
import { Request, Response, NextFunction } from "express";
import { ErrorCode } from "../utils/error-handler/error-code";
import { ErrorException } from "../utils/error-handler/error-exception";
import { IUser } from "../models/user.model";
import { JWT_SECRET, TOKEN_EXPIRES_IN } from "../config";
import jwt from "jsonwebtoken";

export const AuthMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const auth = req.headers.authorization;
  if (auth && auth.startsWith("Bearer")) {
    const token = auth.slice(7);

    try {
      const tokenData = verifyToken(token);
      req.body.tokenData = tokenData;
      next();
    } catch (error) {
      throw new ErrorException(ErrorCode.Unauthenticated);
    }
  } else {
    throw new ErrorException(ErrorCode.Unauthenticated);
  }
};

export const generateAuthToken = (user: IUser): string => {
  const token = jwt.sign({ _id: user._id, email: user.email }, JWT_SECRET, {
    expiresIn: TOKEN_EXPIRES_IN,
  });

  return token;
};

export const verifyToken = (token?: string): { _id: string; email: string } => {
  try {
    if (token) {
      if (token.startsWith("Bearer")) {
        token = token.slice(7);
      }

      const tokenData = jwt.verify(token, JWT_SECRET);
      return tokenData as { _id: string; email: string };
    } else {
      throw new ErrorException(ErrorCode.Unauthenticated);
    }
  } catch (error) {
    throw new ErrorException(ErrorCode.Unauthenticated);
  }
};
