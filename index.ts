import OpenAI from 'openai';
import fs from 'node:fs';
import path from 'node:path';
import express, { NextFunction, Request, Response } from 'express';
import { engine } from 'express-handlebars';
import { config } from 'dotenv';

// Load environment variables
config();

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.post('/drafts', (req: Request, res: Response, next: NextFunction) => {
  try {
  } catch (error) {
    next(error);
  }
});

app.use((error: any, req: Request, res: Response, next: NextFunction) => {
  const statusCode = error.code ? error.code : 500;
  const message = error.message ? error.message : 'Internal Server Error';
  return res.status(statusCode).json({ message });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log('Server listening for requests on port:', PORT);
});
