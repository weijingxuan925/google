const fs = require('fs');
const path = require('path');
const glob = require('glob');
const md5 = require('md5');
const os = require('os');
const mongoose = require('mongoose');
const libraryPath = path.join(__dirname, 'Library');
const coverPath = path.join(libraryPath, 'cover');

// 链接数据库
const connectionString = 'mongodb://localhost:27017/YTM';
mongoose.connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true });

// 创建音乐库集合模型
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

// 创建播放列表模型
const playlistSchema = new mongoose.Schema({
    pid: String,
    name: String,
    tracks: [String],
});

const Playlist = mongoose.model('Playlist', playlistSchema);

// 初始化音乐库
async function libraryInit() {
    const files = glob.sync('**/*.mp3', { cwd: libraryPath });
    const albumPlaylists = {}; // 用于存储每个专辑的播放列表

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

            // 按照 Album 创建播放列表
            if (!albumPlaylists[fileData.album_id]) {
                const playlist = new Playlist({
                    pid: Math.random().toString(36).substr(2, 9), // 生成随机的 pid
                    name: fileData.album,
                    tracks: [],
                });
                await playlist.save();
                albumPlaylists[fileData.album_id] = playlist;
                console.log(`Playlist created: ${playlist.pid} ${playlist.name}`);
            }

            // 将曲目添加到相应的播放列表
            const playlist = albumPlaylists[fileData.album_id];
            playlist.tracks.push(fileData.track_id);
            await playlist.save();
            console.log(`Track added to playlist: ${playlist.pid} ${fileData.track_id}`);
        } catch (error) {
            console.error(`Error processing file: ${file}`);
            console.error(error);
        }
    }));
}

// 启动应用程序
async function start() {
    try {
        await libraryInit();
        // 在此处启动你的应用程序
    } catch (error) {
        console.error('Error starting the app');
        console.error(error);
    }
    // 关闭与 MongoDB 的连接
    await mongoose.connection.close();
}

start().then(() => console.log('Done'));
