const fs = require('fs');
const path = require('path');
const glob = require('glob');
const md5 = require('md5');
const os = require('os');
const async = require('async');
const mongoose = require('mongoose');

const libraryPath = path.join(__dirname, 'Library');
const coverPath = path.join(libraryPath, 'cover');
const indexPath = path.join(libraryPath, 'index.json');
const cpuCount = os.cpus().length;

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

// 创建用户集合模型
const userSchema = new mongoose.Schema({
    uid: String,
    name: String,
    secret: String,
    subscribe: String,
    subscribe_expired: Date,
    last_login: Date,
    playing: String,
});

const User = mongoose.model('users', userSchema);

// 创建播放列表模型
const playlistSchema = new mongoose.Schema({
    pid: String,
    author: String,
    name: String,
    description: String,
    added: Number,
    liked: Number,
    shared: Number,
    played: Number,
    public: Boolean,
    image: String,
    type: String,
    last_update: Date,
});

const Playlist = mongoose.model('Playlist', playlistSchema);

const playlistItemSchema = new mongoose.Schema({
    tid: String,
    order: Number,
});

const PlaylistItem = mongoose.model('<pid>', playlistItemSchema);

// 处理单个文件
const processFile = async (file) => {
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
    } catch (error) {
        console.error(`Error processing file: ${file}`);
        console.error(error);
    }
};

// 初始化音乐库
async function libraryInit() {
    const files = glob.sync('**/*.mp3', { cwd: libraryPath });
    await Promise.all(files.map(file => processFile(file)));
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
