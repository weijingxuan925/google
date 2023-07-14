import md5 from 'md5';
import jwt from 'jsonwebtoken';
import { getPlaylistByUsername, addPlaylist, pushMusicToPlaylist, getMusiclistById} from './PlaylistDao.js';

const secret = 'my_app_secret';

export const getMyPlaylist = async(token) => {
    
    const decoded = jwt.verify(token, secret);

    //console.log(decoded);

    const res = await getPlaylistByUsername(decoded.userName);

    return res;

}

export const getMusiclistInPlaylist = async(playlistId) => {

    const res = await getMusiclistById(playlistId);

    return res;

}

export const addMusicToMyList = async(playlistId, musicId) => {

    const res = await pushMusicToPlaylist(playlistId, musicId);

    return res;

}

export const createPlaylist = async(playlistBody) => {

    const res = await addPlaylist({playlistId: md5(playlistBody.userName + playlistBody.playlistName).substring(0, 16), userName: playlistBody.userName, playlistName: playlistBody.playlistName, musicList: playlistBody.musicList});

    return res;
}