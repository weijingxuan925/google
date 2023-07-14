import mongoose from 'mongoose';

const music = mongoose.Schema({
    trackId: String,
    name: String,
});

const playlistSchema = mongoose.Schema({
    playlistId: String,
    userName: String,
    playlistName: String,
    musicList: [music]
});

const playlist = mongoose.model('playlist', playlistSchema);


export {playlist as Playlist};