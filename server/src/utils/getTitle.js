import ytdl from 'ytdl-core';

export default async function getTitle(url) {
  const info = await ytdl.getInfo(url);
  return info.videoDetails.title.replace(/[^\w\s]/gi, '');
}
