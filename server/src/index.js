import cors from 'cors';
import dotenv from 'dotenv';
import helmet from 'helmet';
import express from 'express';
import morgan from 'morgan';

import downloadRouter from './routes/download.route.js';

dotenv.config();
const port = 3000;
const app = express();

const isLocal = process.env.NODE_ENV === 'development';

const corsOptions = {
  origin: isLocal ? 'http://localhost:3000' : undefined,
};

app.use(helmet());
app.use(morgan(isLocal ? 'dev' : 'tiny'));
app.use(express.json());
app.use(cors(corsOptions));
app.use(express.urlencoded({extended: true}));

app.use('/download', downloadRouter);

app.listen(port, () => {
  console.log(`Server running on  http://localhost:${port}`);
});
