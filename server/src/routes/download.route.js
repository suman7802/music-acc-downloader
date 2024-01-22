import express from 'express';
import download from '../controllers/download.controller.js';

const downloadRouter = express.Router();

downloadRouter.post('/singleAcc', download.singleAccFormat);
downloadRouter.post('/playlistAcc', download.playlistAccFormat);

export default downloadRouter;
