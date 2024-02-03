import { db } from '../configs/db.js';
import { CreateIntegrationDto, IntegrationEnum } from '../types/integration.js';

export class IntegrationRepository {
  constructor() {}
  async storeIntegrationRecord(payload: CreateIntegrationDto, user: any) {
    try {
      return await db.integration.create({
        data: {
          ...payload,
          userId: user.id,
        },
      });
    } catch (error) {
      throw error;
    }
  }

  async integrations(userId: string) {
    try {
      return await db.integration.findMany({
        where: {
          userId,
        },
      });
    } catch (error) {
      throw error;
    }
  }

  async integration(type: IntegrationEnum, userId: string) {
    try {
      const integration = await db.integration.findUnique({
        where: {
          userId,
          type,
        },
      });

      return integration;
    } catch (error) {
      throw error;
    }
  }

  async getIntegration(type: IntegrationEnum, userId: string) {
    try {
      const integration = await db.integration.findUnique({
        where: {
          userId,
          type,
        },
      });

      return integration !== null ? true : false;
    } catch (error) {
      throw error;
    }
  }
}
