import { Playlist } from './PlaylistSchema.js';

export const getPlaylistByUsername = async(name) => {

    const data = await Playlist.find({userName: name}).select('playlistId playlistName');

    return data;

}

export const getMusiclistById = async(id) => {

    const data = await Playlist.find({playlistId: id}, 'musicList');

    return data[0].musicList;

}

export const addPlaylist = async(playlistBody) => {

    const playlist = new Playlist(playlistBody);

    const info = await playlist.save();

}

export const pushMusicToPlaylist = async(id, musicId) => {

    Playlist.update(
        { playlistId: id }, 
        { $push: { musicList: musicId } },
        done
    );

}