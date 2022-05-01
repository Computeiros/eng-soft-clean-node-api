import './config/module-alias';
import swaggerUi from 'swagger-ui-express';
import { env } from '@/main/config/env';
import { app } from '@/main/config/app';
import swaggerFile from '@/swagger.json';

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));
app.listen(env.port, () => {
  console.log(`Server running at http://localhost:${env.port}`);
});
