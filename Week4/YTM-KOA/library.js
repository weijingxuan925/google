const fs = require('fs');
const path = require('path');
const util = require('util');
const glob = require('glob');
const md5 = require('md5');
const os = require('os');
const async = require('async');
const { encode } = require('jpeg-js');
// const { parseFile } = require('music-metadata');

const libraryPath = path.join(__dirname, 'Library');
const coverPath = path.join(libraryPath, 'cover');
const indexPath = path.join(libraryPath, 'index.json');
const cpuCount = os.cpus().length;

// 初始化音乐库
async function libraryInit() {
  // 获取音乐文件列表
  const files = glob.sync('**/*.mp3', { cwd: libraryPath });
  const index = [];
  const albumCovers = {};

  await fs.promises.mkdir(coverPath, { recursive: true });

  // 处理单个文件
  const processFile = async (file, callback) => {
    const filePath = path.join(libraryPath, file);
    try {
      // 解析音乐文件的元数据
      const parseFile = await import('music-metadata').then((module) => module.parseFile);
      const metadata = await parseFile(filePath);

      let { artist, title, album, genre, track, picture } = metadata.common;

      if (!Array.isArray(artist)) {
        // 如果 `artist` 不是一个数组，则将其转换为一个包含一个字符串的数组
        artist = [artist];
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

      // 保存专辑封面图像
      if (picture && picture.length > 0) {
        const albumCoverPath = path.join(coverPath, `${fileData.album_id}.jpg`);
        const imageData = picture[0].data;
        const imageBuffer = Buffer.from(imageData);
        await fs.promises.writeFile(albumCoverPath, encode({ data: imageBuffer, width: 0, height: 0 }, 100).data);
      }

      // 将文件数据添加到索引数组
      index.push(JSON.stringify(fileData));
      console.log(`Index Created: ${trackId} ${file}`);
    } catch (error) {
      console.error(`Error processing file: ${file}`);
      console.error(error);
    }

    callback();
  };


  await new Promise((resolve) => {
    // 并发处理文件
    async.eachLimit(files, cpuCount, processFile, () => {
      resolve();
    });
  });

  // 将索引数据写入文件
  await fs.promises.writeFile(indexPath, index.join('\n'));
}

// 加载音乐库索引
async function libraryLoad() {
  try {
    const data = await fs.promises.readFile(indexPath, 'utf-8');
    const lines = data.split('\n');
    return lines.map((line) => JSON.parse(line));
  } catch (error) {
    console.error('Error loading library index');
    console.error(error);
    return [];
  }
}

// 更新音乐库
async function libraryUpdate(lib) {
  const existingFiles = lib.map((item) => item.file);
  const files = glob.sync('**/*.mp3', { cwd: libraryPath });

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
    const indexExists = await fs.promises.access(indexPath).then(() => true).catch(() => false);

    if (indexExists) {
      // 加载已有的音乐库索引
      const lib = await libraryLoad();
      // 更新音乐库
      await libraryUpdate(lib);
    } else {
      // 初始化音乐库
      await libraryInit();
    }

    // 在此处启动你的应用程序

  } catch (error) {
    console.error('Error starting the app');
    console.error(error);
  }
}

start().then(() => console.log('Done'));
