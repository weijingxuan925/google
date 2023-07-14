import Koa from 'koa';

import Router from 'koa-router';

import cors from 'koa2-cors';

import fs from 'fs';

import { koaBody } from 'koa-body';

import jwt from 'koa-jwt';

import { libraryInit } from './LibraryInit.js';

import { libraryUpdate } from './LibraryUpdate.js';

import { getMusicByTrackId, getAllAlbum, getAlbumById, getAllTrack, getTrackById, getMusicByAlbum } from './MusicDAO.js';


const app = new Koa();
const router = new Router();

app.use(koaBody());
app.use(cors());

app.use(jwt({ secret: 'my_app_secret' }).unless({ path: [/^\/stream/] }));

(async () => {

  await libraryInit(); // Connect to database

  setInterval(         // Update database every 3 seconds
    async () => {

      await libraryUpdate();

    }
    , 3000);

})();

router.get('/stream/:trackId', async (ctx) => {

  //console.log(ctx.request.headers);

  const musicName = await getMusicByTrackId(ctx.params.trackId);

  const src = fs.createReadStream(`./Library/${musicName}.mp3`);

  ctx.response.set('content-type', 'audio/mpeg');

  ctx.body = src;

})//s

router.get('/musicList/:albumName', async (ctx) => {

  const musicList = await getMusicByAlbum(ctx.params.albumName);

  //console.log('/musicList is called.');

  ctx.body = musicList;

})

router.get('/album', async (ctx) => {

  //console.log(ctx.headers);

  const albumList = await getAllAlbum();

  //console.log('/album is called.');

  ctx.body = albumList;

})

router.get('/album/:trackId', async (ctx) => {

  const album = await getAlbumById(ctx.params.trackId);

  ctx.body = album;

})

router.get('/track', async (ctx) => {

  const trackList = await getAllTrack();

  ctx.body = trackList;

})

router.get('/track/:trackId', async (ctx) => {

  const track = await getTrackById(ctx.params.trackId);

  ctx.body = track;

})

app.use(router.routes(), router.allowedMethods());

app.listen(3033);