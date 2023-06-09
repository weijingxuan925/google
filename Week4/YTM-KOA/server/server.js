const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const mongoose = require('mongoose');
const app = new Koa();

// 使用 bodyParser 解析请求体
app.use(bodyParser());

// 连接到 MongoDB 数据库
mongoose.connect('mongodb://localhost:27017/YTM', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    connectTimeoutMS: 30000,  // 30秒连接超时时间
    socketTimeoutMS: 60000,   // 60秒套接字超时时间
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
        ctx.body = `
            <!DOCTYPE html>
            <html>
            <head>
                <title>Welcome to YTM App</title>
            </head>
            <body>
                <h1>Welcome to the YTM App</h1>
                <a href="/login">Login</a>
                <a href="/register">Register</a>
            </body>
            </html>
        `;
    } else {
        await next();
    }
});

// 登录页面的路由处理函数
app.use(async (ctx, next) => {
    if (ctx.method === 'GET' && ctx.path === '/login') {
        ctx.type = 'html';
        ctx.body = `
            <!DOCTYPE html>
            <html>
            <head>
                <title>Login</title>
            </head>
            <body>
                <h1>Login Page</h1>
                <form action="/login" method="post">
                    <label for="username">Username:</label>
                    <input type="text" id="username" name="username" required>
                    <br>
                    <label for="password">Password:</label>
                    <input type="password" id="password" name="password" required>
                    <br>
                    <button type="submit">Login</button>
                </form>
            </body>
            </html>
        `;
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
            }
            else {
                ctx.body = { status: 1, msg: 'Username or Password error.' };
            }
        }
        catch (error) {
            console.error(error);
            ctx.body = { status: 1, msg: 'Internal Server Error' };
        }
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
            } else {
                // 创建新用户
                const newUser = new User({ username, password });
                await newUser.save();

                ctx.body = { status: 0, msg: 'Success' };
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
