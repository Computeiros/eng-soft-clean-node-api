import { Router } from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerFile from '@/swagger.json';

export default (router: Router): void => {
  router.use('/api-docs', swaggerUi.serve);
  router.get('/api-docs', swaggerUi.setup(swaggerFile));
};
