import { NextFunction, Request, Response } from 'express';
import { IntegrationService } from '../services/integration.service.js';
import { pageUrlPrefix } from '../constants/constants.js';

const integrationService = new IntegrationService();

export const configureIntegationController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user: any = req.user;
    await integrationService.configureIntegration(req.body, req.user);
    res.redirect('/integrations');
  } catch (error) {
    next(error);
  }
};

export const renderIntegationController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user: any = req.user;
    const integrations = await integrationService.integrations(user.id);

    const availableIntegrations = integrations.map((integration) => {
      return integration.type;
    });

    const hbsPayload = {
      pageUrl: `${pageUrlPrefix}`,
      pageTitle: `Hashdrafts - Integrate services`,
      showAside: true,
      integrations,
      availableIntegrations,
    };

    res.render('pages/integrations', hbsPayload);
  } catch (error) {
    next(error);
  }
};
