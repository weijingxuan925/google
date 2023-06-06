const http = require('http');
const fs = require('fs');
const path = require('path');

http.createServer(function (request, response) {
  var mp3File = path.join(__dirname, 'qlx.mp3'); // 用你的MP3文件的路径替换 '你的文件名.mp3'

  fs.stat(mp3File, function (err, stats) {
    if (err) {
      if (err.code === 'ENOENT') {
        response.writeHead(404);
        response.end();
      } else {
        response.writeHead(500);
        response.end(err);
      }
      return;
    }

    var range = request.headers.range;
    if (!range) {
      response.writeHead(416);
      response.end();
      return;
    }

    var positions = range.replace(/bytes=/, '').split('-');
    var start = parseInt(positions[0], 10);
    var end = positions[1] ? parseInt(positions[1], 10) : stats.size - 1;
    var chunksize = (end - start) + 1;

    response.writeHead(206, {
      'Content-Range': 'bytes ' + start + '-' + end + '/' + stats.size,
      'Accept-Ranges': 'bytes',
      'Content-Length': chunksize,
      'Content-Type': 'audio/mpeg'
    });

    var stream = fs.createReadStream(mp3File, { start: start, end: end })
      .on('open', function () {
        stream.pipe(response);
      }).on('error', function (err) {
        response.end(err);
      });
  });
}).listen(8888);
