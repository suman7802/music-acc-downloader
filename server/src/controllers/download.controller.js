import fs from 'fs';
import path from 'path';
import ytdl from 'ytdl-core';

const download = {
  accFormat: async (req, res) => {
    const {url} = req.body;
    const video = ytdl(url, {
      filter: 'audioonly',
      quality: 'highestaudio',
    });

    const title = (await ytdl.getInfo(url)).videoDetails.title.replace(
      /[^\w\s]/gi,
      ''
    );

    const dir = '../downloaded';
    const filePath = path.join(dir, `${title}.aac`);

    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, {recursive: true});
    }

    video.pipe(fs.createWriteStream(filePath));
    video.on('progress', (chunkLength, downloaded, total) => {
      let percent = downloaded / total;
      let transformedPercent = (percent * 100).toFixed(2) + '%';
      console.log(transformedPercent);
    });
    video.on('end', () => {
      res.download(filePath);
      return res.status(200).json({
        message: 'Downloaded',
      });
    });
  },
};

export default download;
