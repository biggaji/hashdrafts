import { GraphQLClient } from 'graphql-request';
import { hashnodeAPIUrl } from '../constants/constants';

export const hashNodeAPIClient = (personalAccessToken?: string) => {
  return new GraphQLClient(hashnodeAPIUrl, {
    headers: {
      'Content-type': 'application/json',
      ...(personalAccessToken && { Authorization: personalAccessToken }),
    },
  });
};
