import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import ytdl from 'ytdl-core';
import archiver from 'archiver';
import {google} from 'googleapis';

import catchAsync from '../errors/catchAsync.js';
import customError from '../errors/customError.js';

dotenv.config();

const {API_KEY} = process.env;
const youtube = google.youtube('v3');

async function getPlaylistItems(playlistId, pageToken = null) {
  const response = await youtube.playlistItems.list({
    auth: API_KEY,
    part: 'snippet',
    playlistId: playlistId,
    maxResults: 50,
    pageToken: pageToken,
  });
  return response.data;
}

async function getAllPlaylistItems(playlistId) {
  let allItems = [];
  let pageToken = null;
  do {
    const response = await getPlaylistItems(playlistId, pageToken);
    const items = response.items;
    if (items) {
      allItems = allItems.concat(items);
    }
    pageToken = response.nextPageToken;
  } while (pageToken);
  return allItems;
}

async function getVideoUrls(playlistId) {
  const playlistItems = await getAllPlaylistItems(playlistId);

  const videoUrls = playlistItems.map((item) => {
    const videoId = item.snippet.resourceId.videoId;
    return `https://www.youtube.com/watch?v=${videoId}`;
  });
  return videoUrls;
}

const download = {
  singleAccFormat: catchAsync(async (req, res) => {
    const {url} = req.body;

    if (!url) {
      throw new customError('Please provide a url', 400);
    }

    const video = ytdl(url, {
      filter: 'audioonly',
      quality: 'highestaudio',
    });

    const title = (await ytdl.getInfo(url)).videoDetails.title.replace(
      /[^\w\s]/gi,
      ''
    );

    const dir = '../downloads';
    const filePath = path.join(dir, `${title}.aac`);

    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, {recursive: true});
    }

    video.pipe(fs.createWriteStream(filePath));
    video.on('end', () => {
      res.download(filePath);
    });
  }),

  playlistAccFormat: catchAsync(async (req, res) => {
    const {url} = req.body;
    if (!url) {
      throw new customError('Please provide a url', 400);
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

      const title = (await ytdl.getInfo(videoUrl)).videoDetails.title.replace(
        /[^\w\s]/gi,
        ''
      );

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
