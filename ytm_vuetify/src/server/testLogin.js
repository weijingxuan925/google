const express = require('express');
const mongoose = require('mongoose');

// 创建 Express 应用程序
const app = express();
app.use(express.json());

// 连接到 MongoDB 数据库
mongoose.connect('mongodb://localhost/YTM', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to MongoDB');

        // 定义用户模型
        const UserSchema = new mongoose.Schema({
            username: String,
            password: String,
            email: String
        });

        const User = mongoose.model('User', UserSchema);

        // 定义用户名和密码
        const username = 'weijingxuan';
        const password = 'Wjx010925';

        // 进行用户名和密码验证
        User.findOne({ username, password })
            .then(user => {
                if (user) {
                    console.log('Username and password are correct');
                } else {
                    console.log('Invalid username or password');
                }
            })
            .catch(error => {
                console.error('Error during verification:', error);
            });
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB:', error);
    });

// 启动服务器
app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});
