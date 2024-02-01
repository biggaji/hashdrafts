import { config } from 'dotenv';
import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
const { JsonWebTokenError } = jwt;

// Load env
config();

export async function localAuthGuard(req: Request, res: Response, next: NextFunction) {
  try {
    const token = req.cookies['x-token'];

    if (!token) {
      throw new Error('Login to continue');
    }

    const jwtUserPayload = jwt.verify(token, process.env.JWT_SECRET_KEY!);
    req.user = jwtUserPayload;
    next();
  } catch (error) {
    // if (error instanceof JsonWebTokenError) {
    //   next('Session expired, sign in again');
    // }
    // next(error);
    res.redirect('/auth/login');
  }
}
