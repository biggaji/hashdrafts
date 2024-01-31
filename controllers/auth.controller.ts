import { Request, Response, NextFunction } from 'express';
import { UserService } from '../services/auth.service.js';

const userService = new UserService();

export const signupController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await userService.signup(req.body);
    res.status(201).json({ success: true, message: 'User account created', data: result });
  } catch (error) {
    next(error);
  }
};

export const signinController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const accessToken = await userService.authenticate(req.body);
    res.status(200).json({ accessToken, success: true, message: 'User signin successful' });
  } catch (error) {
    next(error);
  }
};
