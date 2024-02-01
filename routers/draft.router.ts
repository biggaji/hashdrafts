import { Router } from 'express';
import {
  createDraftController,
  saveDraftController,
  updateDraftController,
} from '../controllers/draft.controller.js';

export const draftRouter = Router();

draftRouter.post('/', createDraftController);
draftRouter.post('/save', saveDraftController);
draftRouter.patch('/', updateDraftController);
