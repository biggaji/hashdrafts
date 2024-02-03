import { db } from '../configs/db.js';
import { CreateDraftDto, UpdateDraftDto } from '../types/draft.js';

export class DraftRepository {
  constructor() {}

  async create(payload: CreateDraftDto, userId: string) {
    try {
      return await db.draft.create({
        data: {
          ...payload,
          user: {
            connect: {
              id: userId,
            },
          },
        },
      });
    } catch (error) {
      throw error;
    }
  }

  async drafts(userId: string) {
    try {
      return await db.draft.findMany({
        where: { userId },
      });
    } catch (error) {
      throw error;
    }
  }

  async draft(id: string) {
    try {
      return await db.draft.findUnique({
        where: {
          id,
        },
      });
    } catch (error) {
      throw error;
    }
  }

  async update(id: string, payload: UpdateDraftDto) {
    try {
      return await db.draft.update({
        where: {
          id,
        },
        data: {
          ...payload,
        },
      });
    } catch (error) {
      throw error;
    }
  }

  async delete(id: string) {
    try {
      return await db.draft.delete({
        where: {
          id,
        },
      });
    } catch (error) {
      throw error;
    }
  }

  async deleteMany(userId: string) {
    try {
      return await db.draft.deleteMany({
        where: {
          userId,
        },
      });
    } catch (error) {
      throw error;
    }
  }
}
