// 导入需要的模块
const http = require("http");
const axios = require('axios');

// 启动函数
function start() {
  function onRequest(request, response) {
    // 如果请求的是 /play，从 Task1 服务器获取 MP3 文件流
    if (request.url === '/play') {
      const url = 'http://localhost:8888/'; // 用 Task1 服务器的 URL 和 MP3 文件的路径替换这个

      axios({
        method: 'get',
        url: url,
        responseType: 'stream'
      })
      .then(function (responseAxios) {
        response.setHeader('Content-Type', 'audio/mpeg');
        responseAxios.data.pipe(response);
      })
      .catch(function (error) {
        console.error(error);
        response.writeHead(500, { "Content-Type": "text/plain" });
        response.end("Internal Server Error");
      });

    } else {
      response.writeHead(404);
      response.end();
    }
  }

  // 创建服务器，在8888端口
  http.createServer(onRequest).listen(8889);
  console.log("use /play to play mp3");
  console.log("http://localhost:8889/play");
}

exports.start = start;
