import fs from 'fs';
import dotenv from 'dotenv';
import {google} from 'googleapis';

dotenv.config();
const API_KEY = process.env.API_KEY;

const apiKey = 'AIzaSyADFuX_dFxdE0k9uNC1wzN831q8K97wtuQ';
const youtube = google.youtube('v3');

const playlistUrl =
  'https://youtube.com/playlist?list=PL5Hz3Wnvr8GCRJGusfAg62Hi9VDc14voJ&si=jbPsTkt-SeCzm2bm';
const playlistId = new URLSearchParams(new URL(playlistUrl).search).get('list');

async function getPlaylistItems(playlistId, pageToken = null) {
  const response = await youtube.playlistItems.list({
    auth: apiKey,
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
  console.log(playlistId);
  do {
    const response = await getPlaylistItems(playlistId, pageToken);
    console.log(response);
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

getVideoUrls(playlistId)
  .then((videoUrls) => {
    fs.writeFileSync('video_urls.txt', videoUrls.join('\n'));
    console.log('Video URLs saved to video_urls.txt');
  })
  .catch((err) => {
    console.error('Error:', err.message);
  });
