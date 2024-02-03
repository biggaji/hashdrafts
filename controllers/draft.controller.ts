import { NextFunction, Request, Response } from 'express';
import { DraftService } from '../services/draft.service.js';
import { pageUrlPrefix } from '../constants/constants.js';
import { IntegrationService } from '../services/integration.service.js';
import { IntegrationEnum } from '../types/integration.js';

const draftService = new DraftService();
const integrationService = new IntegrationService();

export const createDraftController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await draftService.createDraft(req.body, req.file);
    res.render('pages/createDraft', {
      pageUrl: `${pageUrlPrefix}/drafts/new`,
      pageTitle: `Hashdrafts - Create new draft`,
      draftMarkdown: JSON.stringify(result),
      showAside: true,
    });
  } catch (error) {
    next(error);
  }
};

export const saveDraftController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user: any = req.user;
    await draftService.saveDraft(req.body, user.id);
    res.redirect('/draft/all');
  } catch (error) {
    next(error);
  }
};

export const updateDraftController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    await draftService.updateDraft(id, req.body);
    res.redirect(`/draft/${id}`);
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
    const user: any = req.user;
    const hasGithubIntegrated = await integrationService.integrationExist(IntegrationEnum.github, user.id);
    res.render('pages/createDraft', {
      pageUrl: `${pageUrlPrefix}/drafts/new`,
      pageTitle: `Hashdrafts - Create new draft`,
      showAside: true,
      hasGithubIntegrated,
    });
  } catch (error) {
    next(error);
  }
};

export const myDraftsGetController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user: any = req.user;
    const drafts = await draftService.fetchDrafts(user.id);
    res.render('pages/myDrafts', {
      pageUrl: `${pageUrlPrefix}/drafts`,
      pageTitle: `Hashdrafts - My drafts`,
      showAside: true,
      drafts,
    });
  } catch (error) {
    next(error);
  }
};

export const editDraftGetController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const draft = await draftService.fetchDraft(req.params.id);
    res.render('pages/editDraft', {
      pageUrl: `${pageUrlPrefix}/draft`,
      pageTitle: `Hashdrafts - Edit draft`,
      showAside: true,
      draftMarkdown: JSON.stringify(draft.content),
      draft,
    });
  } catch (error) {
    next(error);
  }
};
