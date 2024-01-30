import path from 'node:path';
import express, { NextFunction, Request, Response } from 'express';
import { engine } from 'express-handlebars';
import { config } from 'dotenv';
import multer from 'multer';
import markdownIt from 'markdown-it';
import { generateBlogDraft } from './utils/generateBlogDraft.js';
import morgan from 'morgan';
import { hashNodeAPIClient } from './utils/hashNodeAPIClient.js';

import { fileURLToPath } from 'node:url';
import { pageUrlPrefix } from './constants/constants.js';
import { gql } from 'graphql-request';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables
config();

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan('dev'));

const md = markdownIt({
  breaks: true,
  html: false,
});

app.use(express.static(path.join(path.dirname(__dirname), 'public')));

// View engine setup
app.engine('hbs', engine({ extname: 'hbs' }));
app.set('view engine', 'hbs');

const multerUploader = multer({
  limits: {
    fileSize: 1024 * 1024 * 2000, // 2 GB (adjust the size limit as needed)
  },
});

const draft = `# How to Use Hashdrafts to Generate and Improve Blog Article Drafts

If you're a blogger or content creator, you may often find yourself struggling
to come up with new and engaging ideas for your articles. Additionally, once you
have an idea, it can be challenging to create a well-structured and high-quality
draft. This is where Hashdrafts comes in. Hashdrafts is an API service tool that
enables you to generate blog article drafts and provides clear and actionable
suggestions on how to improve the article. In this article, we will explore how
to use Hashdrafts to generate and improve blog article drafts.

## What is Hashdrafts?

Hashdrafts is an API service tool designed to assist content creators in
generating and enhancing blog article drafts. It is a powerful tool that
leverages AI and natural language processing to provide valuable insights and
suggestions for refining and optimizing article drafts.

### How to Generate Blog Article Drafts Using Hashdrafts

1. **Sign Up and Access Hashdrafts**: To get started with Hashdrafts, you'll
need to sign up for an account. Once you have access, you can begin using the
platform to generate blog article drafts.

2. **Enter Topic or Keywords**: Next, you can input the topic or keywords
related to the article you want to create. This will provide Hashdrafts with the
necessary information to generate a draft.

3. **Review and Edit Draft**: Hashdrafts will then generate a draft based on the
topic or keywords provided. You can review the draft and make any necessary
edits to ensure it aligns with your content goals and style.

4. **Actionable Suggestions**: Hashdrafts will also provide actionable
suggestions on how to improve the article. These suggestions can range from
enhancing the overall structure to refining specific paragraphs or sentences.

5. **Publish to Hashnode**: Once you are satisfied with the draft, you can
publish it directly to Hashnode from Hashdrafts, streamlining the content
creation and publication process.

### Tips for Improving Drafts Using Hashdrafts Suggestions

- [Suggestion: Consider including examples or case studies to support your
points and make the content more engaging.]
- [Suggestion: Use the suggestions provided by Hashdrafts to rewrite and refine
your article for improved clarity and coherence.]
- [Suggestion: Incorporate relevant images or multimedia elements to enhance the
visual appeal and comprehension of the content.]
- [Suggestion: Utilize external references and links to provide additional
credibility and depth to your article.]

By leveraging Hashdrafts, content creators can streamline the process of
generating and improving blog article drafts. The platform's AI-powered
suggestions and features empower writers to enhance the quality and impact of
their content, ultimately providing value to their audience. Try out Hashdrafts
today to elevate your content creation process!`;

app.get('/', (req: Request, res: Response, next: NextFunction) => {
  try {
    res.render('pages/index', {
      pageTitle: 'Hashdrafts - Generate article drafts for Hashnode',
      pageUrl: pageUrlPrefix,
      draft: JSON.stringify(draft),
    });
  } catch (error) {
    next(error);
  }
});

// Extract the article type to be generated from the request body
app.post('/draft', multerUploader.single('file'), async (req: Request, res: Response, next: NextFunction) => {
  try {
    const uploadedFile = req.file;
    const { articleType } = req.body;
    if (!uploadedFile) {
      throw new Error('Please choose a text file to upload');
    }

    // TODO: Only accept certain text file e.g (markdown, txt, docx e.t.c)
    const fileMimeType = uploadedFile.mimetype;
    // console.log(fileMimeType);

    // if (fileMimeType !== 'text/markdown') {
    //   throw new Error('Only upload a markdown file');
    // }

    if (!uploadedFile.buffer.length) {
      throw new Error('Please upload a text file that is not empty');
    }

    const fileContent = uploadedFile.buffer.toString();
    const draft = await generateBlogDraft(fileContent, articleType);

    res.status(200).send(draft);
  } catch (error) {
    next(error);
  }
});

app.post('/publish', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { markdownEditor } = req.body;
    const user = req.user;

    const publishDraftPayload = gql``;

    // await hashNodeAPIClient()
    //   .request(publishDraftPayload)
    //   .then((result) => {})
    //   .catch((e) => {
    //     throw e;
    //   });

    console.log(markdownEditor);

    res.status(200).json({
      message: 'Article published to Hashnode',
      success: true,
    });
  } catch (error) {
    next(error);
  }
});

app.use((error: any, req: Request, res: Response, next: NextFunction) => {
  console.log(error);
  const statusCode = error.code ? error.code : 500;
  const message = error.message ? error.message : 'Internal Server Error';
  return res.status(statusCode).json({ message });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log('Server listening for requests on port:', PORT);
});
