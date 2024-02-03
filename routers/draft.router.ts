import { Router } from 'express';
import {
  createDraftController,
  createDraftGetController,
  editDraftGetController,
  myDraftsGetController,
  publishDraftToHashnodePostController,
  saveDraftController,
  updateDraftController,
} from '../controllers/draft.controller.js';
import multer from 'multer';
import { localAuthGuard } from '../auth/guards/auth.guard.js';

const multerUploader = multer({
  limits: {
    fileSize: 1024 * 1024 * 2000, // 2 GB (adjust the size limit as needed)
  },
});

export const draftRouter = Router();
draftRouter.use(localAuthGuard);

draftRouter.post('/', multerUploader.single('document'), createDraftController);
draftRouter.get('/new', createDraftGetController);
draftRouter.post('/save', saveDraftController);
draftRouter.get('/all', myDraftsGetController);
draftRouter.post('/:id', updateDraftController);
draftRouter.get('/:id', editDraftGetController);
draftRouter.post('/publish', publishDraftToHashnodePostController);
