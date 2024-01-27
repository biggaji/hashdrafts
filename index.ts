// import OpenAI from 'openai';
import fs from 'node:fs';
import path from 'node:path';
import express, { NextFunction, Request, Response } from 'express';
import { engine } from 'express-handlebars';
import { config } from 'dotenv';
import multer from 'multer';
import markdownIt from 'markdown-it';
import { runChatCompletion } from './utils/openai.js';

import { fileURLToPath } from 'node:url';
import { pageUrlPrefix } from './constants/constants.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables
config();

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

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

app.get('/', (req: Request, res: Response, next: NextFunction) => {
  try {
    res.render('pages/index', {
      pageTitle: 'Hashdrafts - Generate article drafts for Hashnode',
      pageUrl: pageUrlPrefix,
    });
  } catch (error) {
    next(error);
  }
});

app.post(
  '/drafts',
  multerUploader.single('file'),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (!req.file) {
        throw new Error('Please choose a file to upload');
      }

      if (req.file.mimetype !== 'text/markdown') {
        throw new Error('Only upload a markdown file');
      }

      const content = req.file.buffer.toString();
      const mimeType = req.file.mimetype;
      const aiResp = await runChatCompletion(content, 'how_to');
      res.status(200).send(aiResp);
    } catch (error) {
      next(error);
    }
  },
);

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
