import express from 'express';
import download from '../controllers/download.controller.js';

const downloadRouter = express.Router();

downloadRouter.get('/singleAcc', download.singleAccFormat);
downloadRouter.get('/playlistAcc', download.playlistAccFormat);

export default downloadRouter;
