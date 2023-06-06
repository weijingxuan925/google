// 使用express 建立服务器
const express = require('express');
const bodyParser = require('body-parser');
// 使用cors 解决跨域问题
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.post('/', (req, res) => {
  	// 在控制台输出
    console.log(req.body);
   	// 返回状态
    res.status(200).send('Received POST request');
});

app.listen(3000, () => {
  	// 当服务器成功运行的时候输出
    console.log('Server is running on port 3000');
});
