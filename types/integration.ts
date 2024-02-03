export interface CreateIntegrationDto {
  type: IntegrationEnum;
  personalAccessToken?: string;
  hostUrls?: string[];
  publicationId?: string;
  connected?: boolean;
  isOrg?: boolean;
  installationId?: number;
}

export enum IntegrationEnum {
  github = 'github',
  hashnode = 'hashnode',
}
