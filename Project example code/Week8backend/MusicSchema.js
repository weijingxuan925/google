import mongoose from 'mongoose';

const musicSchema = mongoose.Schema({
    trackId: String,
    name: String,
    album: String,
    artist: String
});

const music = mongoose.model('music', musicSchema);


export {music as Music};