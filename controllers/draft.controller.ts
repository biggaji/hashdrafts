import { NextFunction, Request, Response } from 'express';
import { DraftService } from '../services/draft.service.js';
import { pageUrlPrefix } from '../constants/constants.js';

const draftService = new DraftService();

export const createDraftController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await draftService.createDraft(req.body, req.file);
    res.json({
      success: true,
      message: 'Draft created',
      data: JSON.stringify(result),
    });
  } catch (error) {
    next(error);
  }
};

export const saveDraftController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await draftService.saveDraft(req.body);
    res.json({
      success: true,
      message: 'Draft saved',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const updateDraftController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const result = await draftService.updateDraft(id, req.body);
    res.json({
      success: true,
      message: 'Draft updated',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const publishDraftToHashnodePostController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const result = await draftService.publishDraftToHashnode(req.body, req.user);
    res.json({
      success: true,
      message: 'Draft published to Hashnode',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const createDraftGetController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    res.render('pages/createDraft', {
      pageUrl: `${pageUrlPrefix}/drafts/new`,
      pageTitle: `Hashdrafts - Create new draft`,
    });
  } catch (error) {
    next(error);
  }
};
