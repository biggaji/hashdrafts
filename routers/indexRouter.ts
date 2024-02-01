import { Router } from 'express';
import { localAuthGuard } from '../auth/guards/auth.guard.js';
import { dashboardController, indexController } from '../controllers/index.controller.js';

export const indexRouter = Router();

indexRouter.get('/', indexController);
indexRouter.get('/dashboard', localAuthGuard, dashboardController);
