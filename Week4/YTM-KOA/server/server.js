const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const mongoose = require('mongoose');
const fs = require('fs');
const app = new Koa();
const path = require('path');
const koaStatic = require('koa-static');

// 设置静态文件目录
const staticPath = path.join(__dirname, 'public'); // 替换为你的静态文件目录路径

// 使用 koa-static 中间件
app.use(koaStatic(staticPath));

// 使用 bodyParser 解析请求体
app.use(bodyParser());

// 连接到 MongoDB 数据库
mongoose.connect('mongodb://localhost:27017/YTM', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// 定义用户数据模型
const userSchema = new mongoose.Schema({
    username: String,
    password: String,
});

const User = mongoose.model('User', userSchema, 'users');

// 处理根路径的请求
app.use(async (ctx, next) => {
    if (ctx.method === 'GET' && ctx.path === '/') {
        ctx.type = 'html';
        ctx.body = fs.readFileSync('public/index.html', 'utf8');
    } else {
        await next();
    }
});

// 登录页面的路由处理函数
app.use(async (ctx, next) => {
    if (ctx.method === 'GET' && ctx.path === '/login') {
        ctx.type = 'html';
        ctx.body = fs.readFileSync('public/login.html', 'utf8');
    } else {
        await next();
    }
});

// 登录路由处理函数
app.use(async (ctx, next) => {
    if (ctx.method === 'POST' && ctx.path === '/login') {
        const { username, password } = ctx.request.body;
        console.log('Login Request - Username:', username, 'Password:', password);

        try {
            const user = await User.findOne({ username, password }).exec();

            if (user) {
                ctx.body = { status: 0, msg: 'Success' };
                console.log('Login Success');
            } else {
                ctx.body = { status: 1, msg: 'Username or Password error.' };
                console.log('Login Failed');
            }
        } catch (error) {
            console.error(error);
            ctx.body = { status: 1, msg: 'Internal Server Error' };
        }
    } else {
        await next();
    }
});

// 注册页面的路由处理函数
app.use(async (ctx, next) => {
    if (ctx.method === 'GET' && ctx.path === '/register') {
        ctx.type = 'html';
        ctx.body = fs.readFileSync('public/register.html', 'utf8');
    } else {
        await next();
    }
});

// 注册路由处理函数
app.use(async (ctx, next) => {
    if (ctx.method === 'POST' && ctx.path === '/register') {
        const { username, password } = ctx.request.body;
        console.log('Register Request - Username:', username, 'Password:', password);

        try {
            const userExists = await User.exists({ username });

            if (userExists) {
                ctx.body = { status: 1, msg: 'User Already Exist.' };
                console.log('Register Failed: User Already Exist');
            } else {
                // 创建新用户
                const newUser = new User({ username, password });
                await newUser.save();

                ctx.body = { status: 0, msg: 'Success' };
                console.log('Register Success');
            }
        } catch (error) {
            console.error(error);
            ctx.body = { status: 1, msg: 'Internal Server Error' };
        }
    } else {
        await next();
    }
});

// 启动服务器
const port = 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
