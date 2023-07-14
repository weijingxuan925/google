import md5 from 'md5';
import { getUserByName, addUser} from './UserDao.js';

let message = {
    "status": 0,
    "msg": "Success"
}

export const userRegister = async(userBody) => {

    const res = await getUserByName(userBody.userName);

    //console.log(res.length);

    if(res.length == 0)
    {
        await addUser({userId: md5(userBody.name + userBody.password).substring(0, 16), userName: userBody.userName, password: md5(userBody.password)});

        return message;
    }
    else
    {
        message.status = 1;
        message.msg = "Username Already Exist.";
        
        return message;
    }


}
