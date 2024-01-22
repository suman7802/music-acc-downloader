import fs from 'fs';
import path from 'path';
import ytdl from 'ytdl-core';
import archiver from 'archiver';

import catchAsync from '../errors/catchAsync.js';
import customError from '../errors/customError.js';

import getTitle from '../utils/getTitle.js';
import sanitizeURL from '../utils/sanitizeUrl.js';
import getVideoUrls from '../utils/getVideoUrls.js';

const download = {
  singleAccFormat: catchAsync(async (req, res) => {
    const {url} = req.query;
    if (!url) throw new customError('Please provide a url', 400);

    const sanitizedURL = sanitizeURL(url);
    const title = await getTitle(sanitizedURL);

    const video = ytdl(sanitizedURL, {
      filter: 'audioonly',
      quality: 'highestaudio',
    });

    const dir = '../downloads';
    const filePath = path.join(dir, `${title}.aac`);

    if (!fs.existsSync(dir)) fs.mkdirSync(dir, {recursive: true});

    video.pipe(fs.createWriteStream(filePath));
    video.on('end', () => {
      res.download(filePath);
    });
  }),

  playlistAccFormat: catchAsync(async (req, res) => {
    const {url} = req.query;
    if (!url) throw new customError('Please provide a url', 400);

    if (!url.includes('?list=')) {
      throw new customError('Please provide a playlist url', 400);
    }

    const playlistId = new URLSearchParams(new URL(url).search).get('list');
    const videoUrls = await getVideoUrls(playlistId);
    const dateAndTime = new Date().toISOString();
    const dir = `../downloads/playlist${dateAndTime}`;

    const filePaths = [];

    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, {recursive: true});
    }

    const archive = archiver('zip');
    res.attachment('songs.zip');
    archive.pipe(res);

    const promises = videoUrls.map(async (videoUrl) => {
      const video = ytdl(videoUrl, {
        filter: 'audioonly',
        quality: 'highestaudio',
      });

      const title = await getTitle(videoUrl);

      const filePath = path.join(dir, `${title}.aac`);
      filePaths.push(filePath);

      const writeStream = fs.createWriteStream(filePath);
      video.pipe(writeStream);

      return new Promise((resolve) => {
        writeStream.on('finish', () => {
          console.log(`Downloaded ${title}`);
          archive.file(filePath, {name: path.basename(filePath)});
          resolve();
        });
      });
    });

    await Promise.all(promises);

    await archive.finalize();
  }),
};

export default download;
