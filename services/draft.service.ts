import { gql } from 'graphql-request';
import { DraftRepository } from '../repositories/draft.repository.js';
import {
  CreateDraftDto,
  GenerateDraftDto,
  HashnodeTags,
  PublishDraftToHashnodeDto,
  UpdateDraftDto,
} from '../types/draft.js';
import { generateBlogDraft } from '../utils/generateBlogDraft.js';
import { hashNodeAPIClient } from '../utils/hashNodeAPIClient.js';

const draftRepo = new DraftRepository();

export class DraftService {
  constructor() {}

  async createDraft(payload: GenerateDraftDto, document: Express.Multer.File | undefined) {
    try {
      if (!document) {
        throw new Error('Please choose a document file to upload');
      }

      // TODO: Only accept certain text file e.g (markdown, txt, docx e.t.c)
      const fileMimeType = document.mimetype;
      // console.log(fileMimeType);

      // if (fileMimeType !== 'text/markdown') {
      //   throw new Error('Only upload a markdown file');
      // }

      if (!document.buffer.length) {
        throw new Error('Please upload a text file that is not empty');
      }

      if (!payload.articleType) {
        throw new Error('Please select one of the article type options');
      }

      const fileContent = document.buffer.toString();
      const draft = await generateBlogDraft(fileContent, payload.articleType);
      return draft;
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
      const draft = await draftRepo.draft(id);

      if (!draft) {
        throw new Error('Draft not found');
      }

      return draft;
    } catch (error) {
      throw error;
    }
  }

  async fetchDrafts(userId: string) {
    try {
      const drafts = await draftRepo.drafts(userId);
      return drafts;
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

  async publishDraftToHashnode(publishDraftToHashnodeDto: PublishDraftToHashnodeDto, user: any) {
    try {
      const { content, title, tags } = publishDraftToHashnodeDto;

      // Construct tags
      const hashnodeTags: HashnodeTags[] = tags.split(',').map((tag) => {
        return {
          name: tag,
          slug: tag,
        };
      });

      // TODO:
      // Provide title input, tags input, store user publication host, so they select as dropdown when publishing
      const publishDraftToHashnodePayload = gql`
        mutation publishDraftToHashnode(
          $title: String!
          $content: String!
          $publicationId: ObjectId!
          $tags: [PublishPostTagInput!]!
        ) {
          publishPost(
            input: { title: $title, contentMarkdown: $content, publicationId: $publicationId, tags: $tags }
          ) {
            post {
              id
            }
          }
        }
      `;

      const requestVariables = {
        title,
        content,
        tags: hashnodeTags,
        publicationId: process.env.PUBLICATION_ID,
      };

      await hashNodeAPIClient(process.env.HASHNODE_PAT)
        .request(publishDraftToHashnodePayload, requestVariables)
        .then((result: any) => {
          console.log(result); // { publishPost: { post: { id: '65ba359389349caf7dde3a4c' } } }
          // Check if result.publishPost is truthy and has the expected structure
          if (!result || !result.publishPost || !result.publishPost.post || !result.publishPost.post.id) {
            throw new Error('Failed to publish post because an unexpected error occurred');
          }
        })
        .catch((e) => {
          console.log('Error publishing post to hashnode:', e);
          throw e;
        });
      return true;
    } catch (error) {
      throw error;
    }
  }
}
