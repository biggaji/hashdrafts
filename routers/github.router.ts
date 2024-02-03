import { NextFunction, Request, Response, Router } from 'express';
import { octokitHelper } from '../utils/octokitHelper.js';
import { IntegrationService } from '../services/integration.service.js';
import { IntegrationEnum } from '../types/integration.js';
import { localAuthGuard } from '../auth/guards/auth.guard.js';

const integrationService = new IntegrationService();
export const githubRouter = Router();

githubRouter.use(localAuthGuard);

githubRouter.get('/installation/verify', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { installation_id } = req.query;
    const user = req.user;
    // Get list of available installations
    const installations = await octokitHelper.app.octokit.request('GET /app/installations', {});

    // Check id against it
    // Update db with config details
    if (!installation_id) {
      return;
    }

    const gitHubUser = installations.data.map((installation) => {
      return {
        ...(parseInt(installation_id as string) === installation.id && {
          gitHubAccountType: installation.account?.type,
        }),
      };
    });

    await integrationService.configureIntegration(
      {
        type: IntegrationEnum.github,
        installationId: parseInt(installation_id as string),
        isOrg: gitHubUser[0].gitHubAccountType === 'User' ? false : true,
      },
      user,
    );

    res.redirect('/integrations');
  } catch (error) {
    next(error);
  }
});

githubRouter.get('/installations', async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Get list of available installations
    const installations = await octokitHelper.app.octokit.request('GET /app/installations', {});
    res.json(installations);
  } catch (error) {
    next(error);
  }
});

githubRouter.get('/repos', async (req: Request, res: Response, next: NextFunction) => {
  const user: any = req.user;

  const gitHubIntegration = await integrationService.integration(IntegrationEnum.github, user.id);

  try {
    // Get list of available installations
    const installations = await (
      await octokitHelper.owner(gitHubIntegration!.installationId as number)
    ).request('GET /installation/repositories', {});
    res.json(installations);
  } catch (error) {
    next(error);
  }
});

githubRouter.get('/repos/files', async (req: Request, res: Response, next: NextFunction) => {
  const user: any = req.user;

  let repoUrl = req.query.repoUrl;
  repoUrl = (repoUrl as string).split('mode').join('/');
  // console.log(repoUrl);
  const gitHubIntegration = await integrationService.integration(IntegrationEnum.github, user.id);
  try {
    const repoContent = await (
      await octokitHelper.owner(gitHubIntegration!.installationId as number)
    ).request(`GET ${repoUrl}/contents`, {});
    res.json(repoContent);
  } catch (error) {
    next(error);
  }
});

githubRouter.get('/repos/file/content', async (req: Request, res: Response, next: NextFunction) => {
  const user: any = req.user;

  let repoUrl = req.query.repoUrl;
  let selectedFilePath = req.query.selectedFilePath;

  repoUrl = (repoUrl as string).split('mode').join('/');
  // console.log(repoUrl);
  const gitHubIntegration = await integrationService.integration(IntegrationEnum.github, user.id);
  try {
    const repoContent = await (
      await octokitHelper.owner(gitHubIntegration!.installationId as number)
    ).request(`GET ${repoUrl}/contents/${selectedFilePath}`, {});
    res.json(repoContent);
  } catch (error) {
    next(error);
  }
});
