import md5 from 'md5';
import jwt from 'jsonwebtoken';
import { getUserByName } from './UserDao.js';

const secret = 'my_app_secret';


let message = {
    "status": 0,
    "msg": "Success",
    "token": ""
}

export const userLogin = async(userBody) => {

    const myToken = jwt.sign(userBody, secret, { expiresIn:  '1h' });

    const res = await getUserByName(userBody.userName);

    if(res.length == 0)
    {
        message.status = 1;
        message.msg = "Username or Password error.";

        message.token = "";

        return message;
    }
    else
    {
       if(res[0].password === md5(userBody.password))
       {
            console.log(`${userBody.userName} login successful`);

            message.status = 0;

            message.msg = "Success";

            message.token = myToken;

            return message;
       }
       else
       {
            message.status = 1;
            message.msg = "Username or Password error.";

            message.token = "";

            return message;
       }
    }


}
