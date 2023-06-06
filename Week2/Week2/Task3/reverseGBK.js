const fs = require('fs');
const iconv = require('iconv-lite');

// 同步读取文件内容
const buffer = fs.readFileSync('data.json');

// 将 GBK 编码的内容转换为 UTF-8
const utf8Data = iconv.decode(buffer, 'gbk');

// 将 UTF-8 编码的内容解析为 JSON
const json = JSON.parse(utf8Data);

// 输出解析后的 JSON 
console.log(json);
