// 导入所需的模块
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path'); // 新添加的代码


// 创建 Express 应用程序
const app = express();
app.use(cors());
app.use(bodyParser.json());
// 新添加的代码：设置静态文件服务器
const coverPath = path.join('/Users/jingxuanwei/Desktop/google/ytm_vuetify/Library', 'cover');
app.use('/cover', express.static(coverPath));


// 连接到 MongoDB 数据库
mongoose.connect('mongodb://localhost/YTM', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB:', error);
    });

// 定义用户模型
const UserSchema = new mongoose.Schema({
    username: String,
    password: String,
    email: String
});

const User = mongoose.model('User', UserSchema);

// 定义播放列表模型
const PlaylistSchema = new mongoose.Schema({
    name: String,
    tracks: [String]
});

const Playlist = mongoose.model('Playlist', PlaylistSchema);

// 处理注册请求
app.post('/api/register', (req, res) => {
    const { username, password, email } = req.body;

    // 创建新用户
    const newUser = new User({ username, password, email });

    // 保存用户到数据库
    newUser.save()
        .then(() => {
            console.log('User registered:', newUser);
            res.status(200).json({ message: 'Registration successful' });
        })
        .catch((error) => {
            console.error('Error registering user:', error);
            res.status(500).json({ message: 'Registration failed' });
        });
});

// 处理登录请求
app.post('/api/login', (req, res) => {
    const { username, password } = req.body;

    // 在数据库中查找匹配的用户
    User.findOne({ username, password })
        .then(user => {
            if (user) {
                console.log('Login successful');
                res.status(200).json({ message: 'Login successful' });
                return user.get('username');
            } else {
                console.log('Invalid username or password');
                res.status(401).json({ message: 'Invalid username or password' });
            }
        })
        .catch(error => {
            console.error('Error during login:', error);
            res.status(500).json({ message: 'Login failed' });
        });
});

// 处理获取播放列表请求
app.get('/api/playlists', (req, res) => {
    Playlist.find()
        .then(playlists => {
            console.log('Playlists retrieved:', playlists);
            res.status(200).json(playlists);
        })
        .catch(error => {
            console.error('Error retrieving playlists:', error);
            res.status(500).json({ message: 'Error retrieving playlists' });
        });
});


// 导入其他路由处理器
// const albumRoutes = require('./routes/album');
// const playlistRoutes = require('./routes/playlist');
// const trackRoutes = require('./routes/track');

// // 注册其他路由处理器
// app.use('/album', albumRoutes);
// app.use('/playlist', playlistRoutes);
// app.use('/track', trackRoutes);

// 启动服务器
app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});
