import express from 'express';
import download from '../controllers/download.controller.js';

const downloadRouter = express.Router();

downloadRouter.get('/singleAAC', download.singleAACFormat);
downloadRouter.get('/playlistAAC', download.playlistAACFormat);

export default downloadRouter;
