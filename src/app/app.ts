import express from 'express';
import cors from 'cors';
import yaml from 'yamljs';
import SwaggerUI from 'swagger-ui-express';
import SwaggerJsdoc from 'swagger-jsdoc';
import path from 'path';
import Passport from 'passport';
import router from './routes';
import { jwtAuth, basicAuth } from './config/authentication';
import errorMiddleware from './middleware/errorMiddleware';
import config from './config/var';

const docsFilePath = path.resolve(__dirname, '../../src/docs/openApi.yaml');
const jsonDocsFile = yaml.load(docsFilePath);
const docs = SwaggerJsdoc({
  swaggerDefinition: jsonDocsFile,
  apis: ['./src/app/**/*.ts'],
});

const app = express();

// initialize configuration
jwtAuth();

// express pipeline middleware configuration
app.use(
  '/api/swagger',
  basicAuth(config.apiDocsName, config.apiDocsPassword, true),
  SwaggerUI.serve,
  SwaggerUI.setup(docs, { explorer: true })
);
app.use(cors());
app.use(express.json());
app.use(Passport.initialize());
app.use('/api/v1', router);
app.use(errorMiddleware);

process.on('unhandledRejection', (reason: any) => {
  throw reason;
});
process.on('uncaughtException', (error: any) => {
  errorMiddleware(error);
});

export default app;
