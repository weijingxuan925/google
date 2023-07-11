const fs = require('fs');
const path = require('path');
const glob = require('glob');
const md5 = require('md5');
const os = require('os');
const mongoose = require('mongoose');
const libraryPath = path.join(__dirname, '');
const coverPath = path.join(libraryPath, 'cover');
const indexPath = path.join(libraryPath, 'index.json');
const playlistsPath = path.join(libraryPath, 'playlists.json');

// 链接数据库
const connectionString = 'mongodb://localhost:27017/YTM';
mongoose.connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true });

const librarySchema = new mongoose.Schema({
    track_id: String,
    title: String,
    artist: [String],
    album: String,
    album_id: String,
    genre: String,
    length: Number,
    track_number: Number,
    quality: String,
    file: String,
    added_date: { type: Date, default: Date.now }
});

const Library = mongoose.model('library', librarySchema);

const playlistSchema = new mongoose.Schema({
    pid: String,
    name: String,
    tracks: [String],
});

const Playlist = mongoose.model('Playlist', playlistSchema);

async function libraryInit() {
    const files = glob.sync('**/*.mp3', { cwd: libraryPath});
    const albumPlaylists = {};

    await Promise.all(files.map(async (file) => {
        const filePath = path.join(libraryPath, file);
        try {
            const parseFile = await import('music-metadata').then((module) => module.parseFile);
            const metadata = await parseFile(filePath);
            let { artist, title, album, genre, track, picture } = metadata.common;

            if (!Array.isArray(artist)) {
                artist = [artist];
            }

            if (!artist || !title || !album) {
                console.error(`Invalid metadata for file: ${file}`);
                return;
            }

            const trackId = md5(artist.join('') + title + album).substring(0, 16);
            const trackNumber = track.no || 0;
            const quality = 'STD';
            const fileData = {
                track_id: trackId,
                title,
                artist,
                album,
                album_id: md5(album),
                genre: genre ? genre[0] : '',
                length: metadata.format.duration,
                track_number: trackNumber,
                quality,
                file: file,
            };

            await Library.create(fileData);

            if (picture && picture.length > 0) {
                const albumCoverPath = path.join(coverPath, `${fileData.album_id}.jpg`);
                const imageData = picture[0].data;
                const imageBuffer = Buffer.from(imageData);
                await fs.promises.writeFile(albumCoverPath, imageBuffer);
            }

            if (!albumPlaylists[fileData.album_id]) {
                const playlist = new Playlist({
                    pid: Math.random().toString(36).substr(2, 9),
                    name: fileData.album,
                    tracks: [],
                });
                await playlist.save();
                albumPlaylists[fileData.album_id] = playlist;
                console.log(`Playlist created: ${playlist.pid} ${playlist.name}`);
            }

            const playlist = albumPlaylists[fileData.album_id];
            playlist.tracks.push(fileData.track_id);
            await playlist.save();
            console.log(`Track added to playlist: ${playlist.pid} ${fileData.track_id}`);
        } catch (error) {
            console.error(`Error processing file: ${file}`);
            console.error(error);
        }
    }));

    await fs.promises.writeFile(playlistsPath, JSON.stringify(Object.values(albumPlaylists), null, 2));
    console.log('Library Initialization Completed');
}

async function start() {
    try {
        await libraryInit();
        console.log('Done');
    } catch (error) {
        console.error('Error starting the app');
        console.error(error);
    } finally {
        await mongoose.disconnect();
    }
}

start();
