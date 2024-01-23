import ytdl from 'ytdl-core';
import archiver from 'archiver';

import catchAsync from '../errors/catchAsync.js';
import customError from '../errors/customError.js';

import getTitle from '../utils/getTitle.js';
import sanitizeURL from '../utils/sanitizeUrl.js';
import getVideoUrls from '../utils/getVideoUrls.js';

const download = {
  singleAACFormat: catchAsync(async (req, res) => {
    const {url} = req.query;
    if (!url) throw new customError('Please provide a url', 400);

    const sanitizedURL = sanitizeURL(url);
    const title = await getTitle(sanitizedURL);

    const video = ytdl(sanitizedURL, {
      filter: 'audioonly',
      quality: 'highestaudio',
    });

    res.setHeader('Content-Disposition', `attachment; filename="${title}.aac"`);
    video.pipe(res);
  }),

  playlistAACFormat: catchAsync(async (req, res) => {
    const {url} = req.query;
    if (!url) throw new customError('Please provide a url', 400);

    if (!url.includes('?list=')) {
      throw new customError('Please provide a playlist url', 400);
    }

    const dateAndTime = new Date().toISOString();
    const playlistId = new URLSearchParams(new URL(url).search).get('list');
    const videoUrls = await getVideoUrls(playlistId);

    const archive = archiver('zip');
    res.attachment(`songs-${dateAndTime}.zip`);
    archive.pipe(res);

    const promises = videoUrls.map(async (videoUrl) => {
      const video = ytdl(videoUrl, {
        filter: 'audioonly',
        quality: 'highestaudio',
      });

      const title = await getTitle(videoUrl);

      return new Promise((resolve, reject) => {
        const chunks = [];
        video.on('data', (chunk) => {
          chunks.push(chunk);
        });

        video.on('end', () => {
          const buffer = Buffer.concat(chunks);
          archive.append(buffer, {name: `${title}.aac`});
          resolve();
        });

        video.on('error', (error) => {
          reject(error);
        });
      });
    });

    await Promise.all(promises);
    await archive.finalize();
  }),
};

export default download;
