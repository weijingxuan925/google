const Koa = require('koa');
const Router = require('koa-router');
const fs = require('fs');
const stream = require('koa-stream');
const path = require('path');

const app = new Koa();
const router = new Router();

// 定义音频文件的存储路径
const audioFilePath = './Library';

router.get('/stream/:filename', async (ctx) => {
    const filePath = path.join(audioFilePath, ctx.params.filename);
    const readStream = fs.createReadStream(filePath);
    await stream(ctx, readStream);
});

app.use(router.routes()).use(router.allowedMethods());

// 启动服务器
app.listen(3000, () => {
    console.log('Server is running on port 3000');
    console.log('http://localhost:3000/stream/4.mp3');
    console.log('Press Ctrl+C to stop');
});
