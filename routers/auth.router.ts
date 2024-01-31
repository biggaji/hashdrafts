import { Router } from 'express';
import { signinController, signupController } from '../controllers/auth.controller.js';

export const authRouter = Router();

authRouter.post('/signup', signupController);
authRouter.post('/authenticate', signinController);
