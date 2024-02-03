import { gql } from 'graphql-request';
import { IntegrationRepository } from '../repositories/integration.repository.js';
import { CreateIntegrationDto, IntegrationEnum } from '../types/integration.js';
import { hashNodeAPIClient } from '../utils/hashNodeAPIClient.js';

const integrationRepo = new IntegrationRepository();

export class IntegrationService {
  constructor() {}
  async configureIntegration(createIntegrationDto: CreateIntegrationDto, user: any) {
    try {
      const { type, installationId, isOrg, personalAccessToken } = createIntegrationDto;

      let storeIntegrationPayload: CreateIntegrationDto = { type, connected: true };

      if (type === IntegrationEnum.github) {
        if (!installationId) {
          throw new Error('InstallationId is required to configure GitHub source');
        }

        storeIntegrationPayload.installationId = installationId;
        storeIntegrationPayload.isOrg = isOrg;
      } else {
        if (!personalAccessToken) {
          throw new Error('Please provide your personal access token configure Hashnode as a source');
        }

        // Make request to retrieve blog hostUrl
        const document = gql`
          query Me($first: Int!) {
            me {
              publications(first: $first) {
                edges {
                  node {
                    id
                    url
                  }
                }
              }
            }
          }
        `;

        const requestVariable = {
          first: 1,
        };

        const hashNodeData: any = await hashNodeAPIClient(personalAccessToken).request(
          document,
          requestVariable,
          {
            Authorization: personalAccessToken,
          },
        );

        if (!hashNodeData) {
          throw new Error('Please provided a working Hashnode personal access token');
        }

        const hashnode = hashNodeData.me.publications.edges[0].node;
        // console.log(hashNodeData.me.publications.edges[0].node);

        storeIntegrationPayload.personalAccessToken = personalAccessToken;
        (storeIntegrationPayload.publicationId = hashnode.id),
          (storeIntegrationPayload.hostUrls = [hashnode.url]);
      }

      return await integrationRepo.storeIntegrationRecord(storeIntegrationPayload, user);
    } catch (error) {
      throw error;
    }
  }

  async integrations(userId: string) {
    try {
      return await integrationRepo.integrations(userId);
    } catch (error) {
      throw error;
    }
  }

  async integration(type: IntegrationEnum, userId: string) {
    try {
      return await integrationRepo.integration(type, userId);
    } catch (error) {
      throw error;
    }
  }

  async integrationExist(type: IntegrationEnum, userId: string) {
    try {
      return await integrationRepo.getIntegration(type, userId);
    } catch (error) {
      throw error;
    }
  }
}
