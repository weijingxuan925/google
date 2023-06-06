// 自定义随机生成的密钥
var SECRET_KEY = "j9l8k7a6t5c4g3t2";

// AES-128-ECB加密方法
function encrypt(text) {
    return CryptoJS.AES.encrypt(text, SECRET_KEY, {
        mode: CryptoJS.mode.ECB
    }).toString();
}

function submitLoginForm() {
    var username = document.getElementById("login-username").value;
    var password = document.getElementById("login-password").value;
    var remember = document.getElementById("remember-me").checked;

    var encryptedPassword = encrypt(password);

  	// 需要的格式
    var formData = {
        "user": username,
        "secret": encryptedPassword,
        "remember": remember
    };

  	// 在浏览器的控制台输出
    console.log(formData);
  	// 使用axios 发送登陆请求到服务器的3000端口，数据是formData
    axios.post('http://127.0.0.1:3000', formData);
}

function submitRegisterForm() {
    var username = document.getElementById("register-username").value;
    var password = document.getElementById("register-password").value;
    var confirmPassword = document.getElementById("confirm-password").value;

    if (password !== confirmPassword) {
        alert("两次输入的密码不一致，请重新输入！");
        return;
    }

  	// 用加密算法加密密码
    var encryptedPassword = encrypt(password);

    var formData = {
        "user": username,
        "secret": encryptedPassword,
        "remember": false
    };

    console.log(formData);
 	  // 使用axios 发送注册请求到服务器的3000端口，数据是formData
    axios.post('http://127.0.0.1:3000', formData);
      // 如果成功，跳转到登陆页面，并且输出注册成功
    window.location.href = "login.html";
    alert("注册成功！");
    
}
