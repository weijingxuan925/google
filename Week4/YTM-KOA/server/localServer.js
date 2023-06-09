const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const app = new Koa();

// 使用 bodyParser 解析请求体
app.use(bodyParser());

// 模拟数据库中的用户信息
const users = [
    { username: 'admin', password: 'admin123' },
    { username: 'user1', password: 'password1' },
    { username: 'user2', password: 'password2' }
];

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

        const user = users.find(u => u.username === username && u.password === password);

        if (user) {
            ctx.body = { status: 0, msg: 'Success' };
            console.log('Login Success');
        }
        else {
            ctx.body = { status: 1, msg: 'Username or Password error.' };
            console.log('Login Failed');
        }
    } else {
        await next();
    }
});

// 注册页面的路由处理函数
app.use(async (ctx, next) => {
    if (ctx.method === 'GET' && ctx.path === '/register') {
        ctx.type = 'html';
        ctx.body = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Register</title>
      </head>
      <body>
        <h1>Register Page</h1>
        <form action="/register" method="post">
          <label for="username">Username:</label>
          <input type="text" id="username" name="username" required>
          <br>
          <label for="password">Password:</label>
          <input type="password" id="password" name="password" required>
          <br>
          <button type="submit">Register</button>
        </form>
      </body>
      </html>
    `;
    } else {
        await next();
    }
});

// 注册路由处理函数
app.use(async (ctx, next) => {
    if (ctx.method === 'POST' && ctx.path === '/register') {
        const { username, password } = ctx.request.body;
        console.log('Register Request - Username:', username, 'Password:', password);

        const userExists = users.some(u => u.username === username);

        if (userExists) {
            ctx.body = { status: 1, msg: 'User Already Exist.' };
            console.log('Register Failed: User Already Exist');
        } else {
            // 创建新用户
            users.push({ username, password });
            ctx.body = { status: 0, msg: 'Success' };
            console.log('Register Success');
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
