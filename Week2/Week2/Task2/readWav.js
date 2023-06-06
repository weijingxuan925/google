const fs = require('fs');

// 异步读取 WAV 文件
fs.readFile('bts.wav', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }

  // 将数据加载到 Buffer
  const buffer = Buffer.from(data);

  // 除了buffer的长度以外，输出其他的音频信息
  console.log('Buffer length:', buffer.length);
  const sampleRate = buffer.readUInt32LE(24);
  console.log('Sample Rate:', sampleRate);
  const channels = buffer.readUInt16LE(22);
  console.log('Channels:', channels);
  const bitDepth = buffer.readUInt16LE(34);
  console.log('Bit Depth:', bitDepth);


});