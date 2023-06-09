const Koa = require('koa');
const send = require('koa-send');
const {join} = require("path");
const app = new Koa();

// 定义音频文件的存储路径
const audioFilePath = './Library';

// 处理音频文件请求
app.use(async (ctx, next) => {
    // 检查请求是否以 /stream/ 开头
    if (ctx.path.startsWith('/stream/')) {
        // 获取音频文件名
        const filename = ctx.path.slice('/stream/'.length);
        const filePath = `${audioFilePath}/${filename}`;

        try {
            // 使用 koa-send 将文件作为流发送给客户端
            await send(ctx, filePath);
        } catch (error) {
            // 捕获并忽略 EPIPE 错误
            if (error.code !== 'EPIPE') {
                console.error(`Error sending file: ${filePath}`, error);
            }
        }
    } else {
        // 继续下一个中间件
        await next();
    }
});

// 启动服务器
app.listen(3000, () => {
    console.log('Server is running on port 3000');
    console.log('http://localhost:3000/stream/4.mp3');
    console.log('Press Ctrl+C to stop');
});
