import './util/module-alias';
import express, { Application } from 'express';
import * as http from 'http';
import cors from 'cors';
import xss from 'xss-clean';
import helmet from 'helmet';
import compression from 'compression';
import rateLimit from 'express-rate-limit';
import swaggerUi from 'swagger-ui-express';
import { OpenApiValidator } from 'express-openapi-validator/dist';
import { OpenAPIV3 } from 'express-openapi-validator/dist/framework/types';
import apiSchema from '../swagger.json';

import { createTypeormConn } from '@src/database/connection';
import routesApp from './routes';

export class SetupServer {
  private server?: http.Server;
  private app: Application;

  constructor(private port = 8000) {
    this.app = express();
  }

  public async init(): Promise<void> {
    this.setupExpress();
    this.docsSetup();
    this.setupDatabase();
    this.routes();
  }

  public async initTest(): Promise<void> {
    this.setupExpress();
    this.routes();
  }

  private setupExpress(): void {
    this.app.use(express.json({ limit: '10kb' }));
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(cors());
    this.app.use(xss());
    this.app.use(helmet());
    this.app.use(compression());

    const limiter = rateLimit({
      windowMs: 15 * 60 * 1000,
      max: 100,
      message: 'You have exceeded the 100 requests in 24 hrs limit!',
      headers: true,
    });

    this.app.use(limiter);
  }

  private routes(): void {
    this.app.use('/api/v1', routesApp);
  }

  private async docsSetup(): Promise<void> {
    this.app.use('/docs', swaggerUi.serve, swaggerUi.setup(apiSchema));
    await new OpenApiValidator({
      apiSpec: apiSchema as OpenAPIV3.Document,
      validateRequests: true,
      validateResponses: true,
    }).install(this.app);
  }

  private async setupDatabase() {
    await createTypeormConn();
  }

  public getApp(): Application {
    return this.app;
  }

  public async close(): Promise<void> {
    if (this.server) {
      await new Promise((resolve, reject) => {
        this.server?.close((err) => {
          if (err) {
            return reject(err);
          }
          resolve();
        });
      });
    }
  }

  public start(): void {
    this.server = this.app.listen(this.port, () => {
      console.info('Server listening on port: ' + this.port);
    });
  }
}
