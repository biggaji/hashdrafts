import { NextFunction, Request, Response, Router } from 'express';
import { octokitHelper } from '../utils/octokitHelper.js';

export const githubRouter = Router();

githubRouter.get('/installation/verify', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { installation_id } = req.query;

    // Get list of available installations
    const installations = await octokitHelper.app.octokit.request('GET /app/installations', {});
    // Check id against it
    // Update db with config details
  } catch (error) {
    next(error);
  }
});
