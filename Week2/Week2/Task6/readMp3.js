const fs = require('fs');

const readStream = fs.createReadStream('qlx.mp3', { highWaterMark: 64 * 1024 }); // 使用64KB的缓冲区
const writeStream = fs.createWriteStream('New.mp3');

readStream.pipe(writeStream);

readStream.on('end', () => {
  console.log('文件读取完成');
});

writeStream.on('finish', () => {
  console.log('文件写入完成');
});

writeStream.on('error', (error) => {
  console.error('写入文件时出错:', error);
});