import dotenv from 'dotenv';
import {google} from 'googleapis';

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

export default async function getVideoUrls(playlistId) {
  const playlistItems = await getAllPlaylistItems(playlistId);

  const videoUrls = playlistItems.map((item) => {
    const videoId = item.snippet.resourceId.videoId;
    return `https://www.youtube.com/watch?v=${videoId}`;
  });
  return videoUrls;
}
