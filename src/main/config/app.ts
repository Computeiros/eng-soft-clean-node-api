import express from 'express';
import swaggerUi from 'swagger-ui-express';
import { setupMiddlewares } from './middlewares';
import swaggerFile from '@/swagger.json';
import { setupRoutes } from './routes';

const app = express();
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));

setupMiddlewares(app);
setupRoutes(app);

export { app };
