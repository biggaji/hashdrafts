import { Router } from 'express';
import {
  createDraftController,
  publishDraftToHashnode,
  saveDraftController,
  updateDraftController,
} from '../controllers/draft.controller.js';
import multer from 'multer';

const multerUploader = multer({
  limits: {
    fileSize: 1024 * 1024 * 2000, // 2 GB (adjust the size limit as needed)
  },
});

export const draftRouter = Router();

draftRouter.post('/', multerUploader.single('document'), createDraftController);
draftRouter.post('/save', saveDraftController);
draftRouter.patch('/', updateDraftController);
draftRouter.post('/publish', publishDraftToHashnode);
