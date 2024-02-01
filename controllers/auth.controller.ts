import { Request, Response, NextFunction } from 'express';
import { UserService } from '../services/auth.service.js';
import { pageUrlPrefix } from '../constants/constants.js';

const userService = new UserService();

export const signupPostController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await userService.signup(req.body);
    res.redirect('/pages/login');
  } catch (error) {
    next(error);
  }
};

export const signinPostController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const accessToken = await userService.authenticate(req.body);
    // Store access token and login state in the cookie and redirect to dashboard
    const isSecure = req.secure || req.headers['x-forwarded-proto'] === 'https';
    res.cookie('x-token', accessToken, { secure: isSecure, httpOnly: true });
    // res.cookie('isLoggedIn', true, { httpOnly: true, secure: isSecure });
    res.redirect('/dashboard');
  } catch (error) {
    next(error);
  }
};

export const signupGetController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    res.render('pages/signup', { pageUrl: pageUrlPrefix, pageTitle: 'Hashdrafts - Create account' });
  } catch (error) {
    next(error);
  }
};

export const signinGetController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    res.render('pages/login', { pageUrl: pageUrlPrefix, pageTitle: 'Hashdrafts - Login' });
  } catch (error) {
    next(error);
  }
};

export const forgetPasswordGetController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    res.render('pages/login', { pageUrl: pageUrlPrefix, pageTitle: 'Hashdrafts - Login' });
  } catch (error) {
    next(error);
  }
};

export const resetPasswordPatchController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    res.render('pages/login', { pageUrl: pageUrlPrefix, pageTitle: 'Hashdrafts - Login' });
  } catch (error) {
    next(error);
  }
};
