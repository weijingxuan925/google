import { parseFile } from 'music-metadata';

import fs from 'fs';

import md5 from 'md5';

import { Music } from './MusicSchema.js';

const getSingleMusicMetaData = async (fileName, MusicMetaDataList) => {

  try {
    const metadata = await parseFile(fileName);
    let music = new Object();
    music.trackId = md5(metadata.common.title + metadata.common.album + metadata.common.artist).substring(0, 16);
    music.name = metadata.common.title;
    music.album = metadata.common.album;
    music.artist = metadata.common.artist;
    MusicMetaDataList.push(music);
  } catch (error) {
    console.error(error.message);
  }

}

const getMusicMetaDataList = async () => {

  let MusicMetaDataList = new Array();

  const fileNames = fs.readdirSync('Library/');

  let path = '';

  for (let i = 0; i < fileNames.length; i++) {
    path = `./Library/${fileNames[i]}`;

    await getSingleMusicMetaData(path, MusicMetaDataList);
  }

  return MusicMetaDataList;

}

export const libraryUpdate = async () => {

  const MusicMetaDataList = await getMusicMetaDataList();

  const data = await Music.find({});

  const idList = await Music.find({}).select('trackId');

    let localIdList = new Array();

    for (let i = 0; i < MusicMetaDataList.length; i++) {

      localIdList.push(MusicMetaDataList[i].trackId);

      let exist = await Music.exists({ trackId: MusicMetaDataList[i].trackId });

      if (!exist) {
        let tmp = new Music(MusicMetaDataList[i]);

        await tmp.save().then(function () {
          console.log("A song has been added.");
        }).catch(function (error) {
          console.log(error);;
        })
      }
    }

    for (let i = 0; i < idList.length; i++) {

      if (!localIdList.includes(idList[i].trackId.toString())) {

          Music.deleteOne({trackId: idList[i].trackId.toString()}).then(function () {

          console.log("A song has been deleted.");

        }).catch(function (error) {

          console.log(error);

        });
      }

    }

}

