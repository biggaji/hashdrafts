import { UserSignupDto } from '../types/user.js';
import { db } from '../configs/db.js';

export class UserRepository {
  constructor() {}
  async create(payload: UserSignupDto) {
    try {
      return await db.user.create({
        data: {
          ...payload,
        },
      });
    } catch (error) {
      throw error;
    }
  }

  async getRecordById(id: string) {
    try {
      return await db.user.findUnique({
        where: {
          id,
        },
      });
    } catch (error) {
      throw error;
    }
  }

  async getRecordByEmail(email: string) {
    try {
      return await db.user.findUnique({
        where: {
          email,
        },
      });
    } catch (error) {
      throw error;
    }
  }
}
