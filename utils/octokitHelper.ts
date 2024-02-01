import { config } from 'dotenv';
import { App } from 'octokit';

// Load environment variables
config();

// Setup Github App
const GithubApp = new App({
  appId: process.env.GITHUB_APP_ID!,
  privateKey: process.env.GITHUB_PRIVATE_KEY!,
});

/**
 * Helper to manage Github App lifecycle
 * @method app - The authenticated Github app itself
 * @method owner - The authenticated installation
 */
export const octokitHelper = {
  app() {
    return GithubApp;
  },
  async owner(installationId: number) {
    try {
      if (!installationId) {
        throw new Error('InstallationId is required to get an authenticated octokit');
      }
      return await GithubApp.getInstallationOctokit(installationId);
    } catch (error) {
      throw error;
    }
  },
};
