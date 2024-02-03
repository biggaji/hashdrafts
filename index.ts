import path from 'node:path';
import express, { NextFunction, Request, Response } from 'express';
import { engine } from 'express-handlebars';
import { config } from 'dotenv';
import morgan from 'morgan';
import { fileURLToPath } from 'node:url';
import { authRouter } from './routers/auth.router.js';
import { draftRouter } from './routers/draft.router.js';
import { githubRouter } from './routers/github.router.js';
import { indexRouter } from './routers/indexRouter.js';
import cookieParser from 'cookie-parser';
import { integrationRouter } from './routers/integration.router.js';
import Handlebars from 'handlebars';

// Load environment variables
config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan('dev'));
app.use(cookieParser());

app.use(express.static(path.join(path.dirname(__dirname), 'public')));

// View engine setup
Handlebars.registerHelper('eq', function (value1, value2) {
  return value1 === value2;
});

Handlebars.registerHelper('needsIntegration', function (type, availableIntegrations) {
  try {
    let needsIntegration = true;
    if (availableIntegrations.includes(type)) {
      needsIntegration = false;
    }
    return needsIntegration;
  } catch (error) {
    console.error('Error checking integration existence:', error);
    return true; // Assuming integration check failure means integration is needed
  }
});

app.engine('hbs', engine({ extname: 'hbs' }));
app.set('view engine', 'hbs');

// Routers
app.use('/', indexRouter);
app.use('/auth', authRouter);
app.use('/draft', draftRouter);
app.use('/integrations', integrationRouter);
app.use('/github', githubRouter);

app.use((error: any, req: Request, res: Response, next: NextFunction) => {
  console.log('General error middleware', error);
  const statusCode = error.code ? error.code : 500;
  const message = error.message ? error.message : 'Internal Server Error';
  return res.status(statusCode).json({ message });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log('Server listening for requests on port:', PORT);
});
