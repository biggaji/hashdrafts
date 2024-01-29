import { config } from 'dotenv';
import OpenAI from 'openai';

// Load environment variables
config();

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

type ArticleType = 'technical how-to' | 'marketing' | any;

/**
 * Generates a blog article draft based on an article type
 * @param fileContent
 * @param articleType
 * @returns A blog article draft in a markdown format
 */
async function generateBlogDraft(fileContent: string, articleType: ArticleType) {
  try {
    if (!fileContent || !fileContent.length) {
      throw new Error('Please provide the file content to be analyzed');
    }

    if (!articleType) {
      throw new Error('Please choose at least one article type');
    }

    const completion = await openai.chat.completions.create({
      messages: [
        {
          role: 'assistant',
          content: `Analyze this content: ${fileContent}, based on your analysis, and generate a comprehensive ${articleType} blog article draft. Within this draft content, provide good and clear suggestions in a readable comments e.g [Suggestion: then the suggestion] e.t.c within the draft on how to improve or make each point within the article draft better for potential readers. Include images, links references if available. The generated draft should be in an editable markdown format.`,
        },
      ],
      model: 'gpt-3.5-turbo-1106',
    });

    return completion.choices[0].message.content;
  } catch (error: any) {
    console.error(`Error occured while generating blog article draft: ${error.message}`);
    throw error;
  }
}

export { generateBlogDraft, ArticleType };
