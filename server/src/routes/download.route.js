import express from 'express';
import download from '../controllers/download.controller.js';

const downloadRouter = express.Router();

downloadRouter.post('/acc', download.accFormat);

export default downloadRouter;
