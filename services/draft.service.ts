import { DraftRepository } from '../repositories/draft.repository.js';
import { CreateDraftDto, UpdateDraftDto } from '../types/draft.js';
import { generateBlogDraft } from '../utils/generateBlogDraft.js';
import { hashNodeAPIClient } from '../utils/hashNodeAPIClient.js';

const draftRepo = new DraftRepository();

export class DraftService {
  constructor() {}

  async createDraft(payload: {}) {
    try {
    } catch (error) {
      throw error;
    }
  }

  async saveDraft(storeDraftDto: CreateDraftDto) {
    try {
    } catch (error) {
      throw error;
    }
  }

  async fetchDraft(id: string) {
    try {
    } catch (error) {
      throw error;
    }
  }

  async fetchDrafts(userId: string) {
    try {
    } catch (error) {
      throw error;
    }
  }

  async updateDraft(id: string, updateDraftDto: UpdateDraftDto) {
    try {
    } catch (error) {
      throw error;
    }
  }
}
