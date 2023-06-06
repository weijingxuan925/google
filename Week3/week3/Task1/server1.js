// 导入需要的模块
const http = require("http");
const fs = require("fs");
const path = require("path");

// 启动函数
function start() {
  function onRequest(request, response) {
    // 读取固定的mp3位置
    const filePath = path.join(__dirname, "qlx.mp3");

    
    fs.stat(filePath, (err, stats) => {
      // 输出错误
      if (err) {
        console.error(err);
        response.writeHead(500, { "Content-Type": "text/plain" });
        // 返回内部错误报错
        response.end("Internal Server Error");
        return;
      }

      // 读取成功
      response.writeHead(200, {
        "Content-Type": "audio/mpeg",
        "Content-Length": stats.size,
      });

      // 创建流和管道
      fs.createReadStream(filePath).pipe(response);
    });
  }

  // 创建服务器，在8888端口
  http.createServer(onRequest).listen(8888);
  console.log("Server is now start visit link below");
  console.log("http://localhost:8888/");
}

exports.start = start;

