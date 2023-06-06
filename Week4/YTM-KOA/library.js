import fs from 'fs';
import path from 'path';
import { promisify } from 'util';
import { parseFile } from 'music-metadata';
import { md5 } from 'crypto-js';
import { encode } from 'jpeg-js';

const readdir = promisify(fs.readdir);
const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);

const __filename = import.meta.url.substring(7);
const __dirname = path.dirname(__filename);
const libraryPath = path.join(__dirname, 'Library');
const indexFilePath = path.join(libraryPath, 'index.json');
const coverPath = path.join(libraryPath, 'cover');

async function libraryInit() {
  try {
    // Read the files in the Library directory
    const files = await readdir(libraryPath);

    // Filter out only the MP3 files
    const mp3Files = files.filter(file => path.extname(file).toLowerCase() === '.mp3');

    // Create the cover directory if it doesn't exist
    if (!fs.existsSync(coverPath)) {
      fs.mkdirSync(coverPath);
    }

    // Create an array to store the metadata objects
    const metadataList = [];

    // Process each MP3 file
    await Promise.all(mp3Files.map(async file => {
      const filePath = path.join(libraryPath, file);

      // Read the ID3 tags using music-metadata library
      const metadata = await parseFile(filePath);

      // Generate the track ID
      const { artist, title, album } = metadata.common;
      const trackId = md5(`${artist}${title}${album}`).toString().substring(0, 16);

      // Extract the necessary information
      const { albumartist, title: songTitle, album: albumTitle, genre, year, track, duration } = metadata.common;
      const artistList = Array.isArray(albumartist) ? albumartist : [albumartist];
      const trackNumber = track.no ? parseInt(track.no, 10) : 0;

      // Save the cover image if it exists
      if (metadata.common.picture && metadata.common.picture.length > 0) {
        const coverImage = metadata.common.picture[0];
        const albumId = md5(albumTitle).toString();
        const coverFilePath = path.join(coverPath, `${albumId}.jpg`);
        const coverBuffer = coverImage.format === 'image/jpeg' ? coverImage.data : encode({ data: coverImage.data, width: coverImage.width, height: coverImage.height }, 100).data;
        fs.writeFileSync(coverFilePath, coverBuffer);
      }

      // Create the metadata object
      const metadataObj = {
        track_id: trackId,
        title: songTitle,
        artist: artistList,
        album: albumTitle,
        album_id: md5(albumTitle).toString(),
        genre,
        length: duration,
        track_number: trackNumber,
        quality: 'STD',
        file: filePath
      };

      metadataList.push(metadataObj);

      console.log(`Index Created: ${trackId} ${filePath}`);
    }));

    // Write the metadata objects to index.json
    const indexFileData = metadataList.map(metadataObj => JSON.stringify(metadataObj)).join('\n');
    await writeFile(indexFilePath, indexFileData);

    console.log('Library initialization completed.');

  } catch (error) {
    console.error('An error occurred during library initialization:', error);
  }
}

libraryInit();
