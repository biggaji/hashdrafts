import { config } from 'dotenv';
import OpenAI from 'openai';

// Load env
config();

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

type ArticleType = 'technical' | 'marketing' | 'how_to';

async function runChatCompletion(input: string, articleType: ArticleType) {
  try {
    const completion = await openai.chat.completions.create({
      messages: [
        {
          content: `Generate a ${articleType} article draft from this: ${input} and also provide good a suggestions
           within the drafts on how best to improve the article, this suggestion should be in comments, and the reponse should be in markdown format`,
          role: 'assistant',
        },
      ],
      model: 'gpt-3.5-turbo-1106',
    });

    if (completion.choices[0].finish_reason !== 'stop') {
      return;
    }

    return completion.choices[0].message.content;
  } catch (error: any) {
    console.error(`Error occured while running chat completions: ${error.message}`);
    throw error;
  }
}

export { runChatCompletion, ArticleType };
