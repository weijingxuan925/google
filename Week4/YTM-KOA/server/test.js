const mongoose = require('mongoose');

// 连接到 MongoDB 数据库
mongoose.connect('mongodb://localhost:27017/YTM', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// 获取默认连接
const db = mongoose.connection;

// 监听连接成功事件
db.on('connected', () => {
    console.log('数据库连接成功');

    // 执行测试查询
    testDatabaseConnection();
});

// 监听连接错误事件
db.on('error', (error) => {
    console.error('数据库连接错误:', error);
});

// 定义测试查询函数
async function testDatabaseConnection() {
    try {
        // 执行一个空的查询操作
        const result = await db.collection('users').findOne({});
        console.log('数据库查询结果:', result);
    } catch (error) {
        console.error('数据库查询错误:', error);
    } finally {
        // 关闭数据库连接
        db.close();
    }
}
