const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const mongoose = require('mongoose');
const app = new Koa();

// 使用 bodyParser 解析请求体
app.use(bodyParser());

// 连接到 MongoDB 数据库
mongoose.connect('mongodb://localhost/YTM', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// 定义用户数据模型
const userSchema = new mongoose.Schema({
    username: String,
    password: String,
});

const User = mongoose.model('User', userSchema, 'users');

// 登录路由处理函数
app.use(async (ctx, next) => {
    if (ctx.method === 'POST' && ctx.path === '/login') {
        const { username, password } = ctx.request.body;
        console.log('Login Request - Username:', username, 'Password:', password);

        try {
            const user = await User.findOne({ username, password }).exec();

            if (user) {
                ctx.body = { status: 0, msg: 'Success' };
            } else {
                ctx.body = { status: 1, msg: 'Username or Password error.' };
            }
        } catch (error) {
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
app.listen(3001, () => {
    console.log('Server is running on port 3000');
});
