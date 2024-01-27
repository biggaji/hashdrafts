// import OpenAI from 'openai';
import fs from 'node:fs';
import path from 'node:path';
import express, { NextFunction, Request, Response } from 'express';
import { engine } from 'express-handlebars';
import { config } from 'dotenv';
import multer from 'multer';
import markdownIt from 'markdown-it';
import { runChatCompletion } from './utils/openai.js';

// Load environment variables
config();

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const md = markdownIt({
  breaks: true,
  html: false,
});

const multerUploader = multer({
  limits: {
    fileSize: 1024 * 1024 * 2000, // 2 GB (adjust the size limit as needed)
  },
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
