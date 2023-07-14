import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
    userId: String,
    userName: String,
    password: String,
});

const user = mongoose.model('user', userSchema);


export {user as User};