import { User } from './UserSchema.js';

export const getUserByName = async(name) => {

    const data = await User.find({userName: name});

    return data;

}

export const getUserById = async(id) => {

    const data = await User.find({userId: id});

    return data;

}

export const addUser = async(userBody) => {

    const user = new User(userBody);

    const info = await user.save();

}