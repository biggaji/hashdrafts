import { Router } from 'express';
import { localAuthGuard } from '../auth/guards/auth.guard.js';
import {
  configureIntegationController,
  renderIntegationController,
} from '../controllers/integration.controller.js';

export const integrationRouter = Router();
integrationRouter.use(localAuthGuard);

integrationRouter.get('/', renderIntegationController);
integrationRouter.post('/configure', configureIntegationController);
