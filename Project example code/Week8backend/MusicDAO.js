import { Music } from './MusicSchema.js';

export const getMusicByTrackId = async(id) => {

    const data = await Music.find({trackId: id});
    
    const name = data[0].name;

    return name;

}

export const getMusicByAlbum = async(albumName) => {

    const data = await Music.find({album: albumName});

    return data;
    
}

export const getAlbumById = async(id) => {

    const data = await Music.find({trackId: id});
    
    const album = data[0].album;

    return album;

}

export const getAllAlbum = async() => {

    const data = await Music.find({}, 'album');

    let unique = [];

    data.forEach(element => {
        if (!unique.includes(element.album)) {
            unique.push(element.album);
        }
    });

    return unique;

}

export const getTrackById = async(id) => {

    const data = await Music.find({trackId: id});
    
    const track = data[0];

    return track;

}

export const getAllTrack = async(id) => {

    const data = await Music.find();

    return data;

}
