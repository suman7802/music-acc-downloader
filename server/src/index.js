import cors from 'cors';
import path from 'path';
import morgan from 'morgan';
import dotenv from 'dotenv';
import helmet from 'helmet';
import {dirname} from 'path';
import express from 'express';
import {fileURLToPath} from 'url';

import downloadRouter from './routes/download.route.js';
import errorHandler from './controllers/errorHandler.js';

dotenv.config();
const PORT = process.env.PORT || 8000;
const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const isLocal = process.env.NODE_ENV === 'development';

const corsOptions = {
  origin: isLocal ? 'http://localhost:5173' : undefined,
};

app.use(helmet());
app.use(morgan(isLocal ? 'dev' : 'tiny'));
app.use(express.json());
app.use(cors(corsOptions));
app.use(express.urlencoded({extended: true}));

app.use('/download', downloadRouter);
app.use(errorHandler);

app.use(express.static(path.join(__dirname, '../../client/dist')));
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../../client/dist/index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on  http://localhost:${PORT}`);
});
