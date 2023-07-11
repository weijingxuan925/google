const fs = require('fs');
const path = require('path');
const glob = require('glob');
const md5 = require('md5');
const os = require('os');
const async = require('async');
const { encode } = require('jpeg-js');

const libraryPath = path.join(__dirname, '');
const coverPath = path.join(libraryPath, 'cover');
const indexPath = path.join(libraryPath, 'index.json');
const cpuCount = os.cpus().length;

// 初始化音乐库
async function libraryInit() {
    // 获取音乐文件列表
    const files = glob.sync('**/*.mp3', { cwd: libraryPath });
    const index = [];
    const playlists = [];
    // 初始化音乐照片文件夹
    const albumCovers = {};
// 播放列表文件路径
    const playlistsPath = path.join(libraryPath, 'playlists.json');

    // 创建音乐照片文件夹
    await fs.promises.mkdir(coverPath, { recursive: true });

    // 创建播放列表文件
    const createPlaylistsFile = async () => {
        const playlistsData = []; // 初始播放列表为空数组
        await fs.promises.writeFile(playlistsPath, JSON.stringify(playlistsData));
        console.log(`Playlists file created: ${playlistsPath}`);
    };

// 检查播放列表文件是否存在，如果不存在则创建
    const checkPlaylistsFile = async () => {
        try {
            await fs.promises.access(playlistsPath, fs.constants.F_OK);
            console.log(`Playlists file already exists: ${playlistsPath}`);
        } catch (error) {
            console.log(`Playlists file not found, creating...`);
            await createPlaylistsFile();
        }
    };

// 调用检查播放列表文件的函数
    await checkPlaylistsFile();

    // 处理单个文件
    const processFile = async (file, callback) => {
        if (typeof callback !== 'function') {
            // 默认回调函数为空函数
            callback = () => {};
        }

        // 获取文件路径
        const filePath = path.join(libraryPath, file);
        try {
            // 解析音乐文件的元数据，调用 `music-metadata` 模块
            const parseFile = await import('music-metadata').then((module) => module.parseFile);
            const metadata = await parseFile(filePath);

            let {
                artist,
                title,
                album,
                genre,
                track,
                picture
            } = metadata.common;
            // 如果 `artist` 不是一个数组，则将其转换为一个包含一个字符串的数组
            if (!Array.isArray(artist)) {
                artist = [artist];
            }

            // 返回报错
            if (!artist || !title || !album) {
                console.error(`Invalid metadata for file: ${file}`);
                callback();
                return;
            }

            // 获取音乐文件的 ID，等信息
            const trackId = md5(artist.join('') + title + album).substring(0, 16);
            const trackNumber = track.no || 0;
            const quality = 'STD';
            // json file的数据
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

            // 保存专辑封面图像
            if (picture && picture.length > 0) {
                const albumCoverPath = path.join(coverPath, `${fileData.album_id}.jpg`);
                const imageData = picture[0].data;
                const imageBuffer = Buffer.from(imageData);
                await fs.promises.writeFile(albumCoverPath, encode({ data: imageBuffer, width: 0, height: 0 }, 100).data);
            }

            // 将文件数据添加到索引数组，按照格式要求换行
            index.push(JSON.stringify(fileData, null, 2));
            console.log(`Index Created: ${trackId} ${file}`);
            // 按照Album创建Playlist
            const albumPlaylist = {
                pid: Math.random().toString(36).substr(2, 9), // 生成随机的pid
                name: album,
                tracks: [fileData.track_id],
            };
            playlists.push(albumPlaylist);
            console.log(`Playlist Created: ${albumPlaylist.pid} ${album}`);
        }
        catch (error) {
            console.error(`Error processing file: ${file}`);
            console.error(error);
        }

        callback();
    };

    // 并发处理文件
    await new Promise((resolve) => {
        async.eachLimit(files, cpuCount, processFile, () => {
            resolve();
        });
    });

    // 将索引数据写入文件，按照格式要求识别整体json
    await fs.promises.writeFile(indexPath, JSON.stringify(index, null, 2));
    // 将Playlist数据写入文件，按照格式要求识别整体json
    await fs.promises.writeFile(playlistsPath, JSON.stringify(playlists, null, 2));

    console.log('Library Initialization Completed');
}

// 加载音乐库索引
async function libraryLoad() {
    try {
        // 读取索引文件
        const data = await fs.promises.readFile(indexPath, 'utf-8');
        // 使用换行符分割索引文件
        const lines = data.split('\n');
        // 转换成一个数组
        return lines.map(line => JSON.parse(line));
    }
    catch (error) {
        console.error('Error loading library index');
        console.error(error);
        return [];
    }
}


// 更新音乐库
async function libraryUpdate(lib) {
    const existingFiles = lib.map((item) => item.file);
    const files = glob.sync('**/*.mp3', { cwd: libraryPath });
    // 解析文件
    const removeItems = lib.filter((item) => !existingFiles.includes(item.file));
    const newFiles = files.filter((file) => !existingFiles.includes(file));

    if (removeItems.length > 0) {
        console.log('Removing items:');
        console.log(removeItems);
        const newLib = lib.filter((item) => !removeItems.includes(item));
        await fs.promises.writeFile(indexPath, newLib.map((item) => JSON.stringify(item)).join('\n'));
    }

    if (newFiles.length > 0) {
        console.log('Adding new files:');
        console.log(newFiles);
        await libraryInit();
    }
}

// 启动应用程序
async function start() {
    try {
        const indexExists = await fs.promises.access(indexPath)
            .then(() => true)
            .catch(() => false);
        if (indexExists) {
            // 加载已有的音乐库索引
            const lib = await libraryLoad();
            // 更新音乐库
            await libraryUpdate(lib);
        }
        else {
            // 初始化音乐库
            await libraryInit();
        }

    } catch (error) {
        console.error('Error starting the app');
        console.error(error);
    }
}

start().then(() => console.log('Done'));
