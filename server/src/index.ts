import express, { RequestHandler } from 'express';
import path from 'path';
import { config as dotenvConfig } from 'dotenv';
import cors from 'cors';
import fileUpload from 'express-fileupload';
import router from '../routes';
import errorHandler from '../middleware/ErrorHandlingMiddleware';

dotenvConfig();

const app = express();
const port = process.env.PORT;
const root = path.resolve(__dirname, '..');
const staticFolder = path.resolve(root, "static");

app.use(cors() as RequestHandler);
app.use(express.json());
app.use(express.static(staticFolder));
app.use(fileUpload({}));
app.use('/api', router);

// Error handler should be last in middleware list
app.use(errorHandler);

app.listen(port, () => console.log(`Running on port: ${port}`));