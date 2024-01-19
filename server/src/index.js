import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import helmet from 'helmet';
import express from 'express';

import downloadRouter from './routes/download.route.js';

dotenv.config();
const {PORT} = process.env;
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

app.listen(PORT, () => {
  console.log(`Server running on  http://localhost:${PORT}`);
});
