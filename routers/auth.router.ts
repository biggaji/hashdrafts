import { Router } from 'express';
import {
  signinGetController,
  signinPostController,
  signupGetController,
  signupPostController,
} from '../controllers/auth.controller.js';

export const authRouter = Router();

authRouter.post('/signup', signupPostController);
authRouter.post('/authenticate', signinPostController);
authRouter.get('/signup', signupGetController);
authRouter.get('/login', signinGetController);
