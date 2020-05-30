import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface UserPayload {
  id: String;
  email: String;
}

// Find the Express project, and inside the Request interface we want to add an optional property which is
// type of UserPayload
declare global {
  namespace Express {
    interface Request {
      currentUser?: UserPayload;
    }
  }
}

// if user is logged in, it sets req.currentuser with payload
// else there is no such property of req.currentuser
export const currentUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.session || !req.session.jwt) {
    return next();
  }

  try {
    const payload = jwt.verify(
      req.session.jwt,
      process.env.JWT_KEY!
    ) as UserPayload;
    req.currentUser = payload;
  } catch (err) {}

  next();
};
