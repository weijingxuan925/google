import Koa from 'koa';

import Router from 'koa-router';

import cors from 'koa2-cors';

import fs from 'fs';

import { koaBody } from 'koa-body';

import jwt from 'koa-jwt';

import { libraryInit } from './LibraryInit.js';

import { libraryUpdate } from './LibraryUpdate.js';

import { userLogin } from './UserLogInService.js';

import { userRegister } from './UserRegisterService.js';

import { getMyPlaylist, getMusiclistInPlaylist, createPlaylist } from './PlaylistService.js';

import { getMusicByTrackId, getAllAlbum, getAlbumById, getAllTrack, getTrackById, getMusicByAlbum } from './MusicDAO.js';


const app = new Koa();
const router = new Router();

app.use(koaBody());
app.use(cors());

app.use(jwt({ secret: 'my_app_secret' }).unless({ path: [/^\/user/, /^\/image/, /^\/stream/, /^\/createPlaylist/] }));

(async () => {

  await libraryInit(); // Connect to database

  setInterval(         // Update database every 3 seconds
    async () => {

      await libraryUpdate();

    }
    , 3000);

})();

router.post('/user/login', async (ctx) => {

  const user = ctx.request.body;

  const res = await userLogin(user);

  ctx.response.set('content-type', 'application/json');

  ctx.body = res;

})

router.post('/user/register', async (ctx) => {

  const user = ctx.request.body;

  const res = await userRegister(user);

  ctx.body = res;

})

router.get('/stream/:trackId', async (ctx) => {

  //console.log(ctx.request.headers);

  const musicName = await getMusicByTrackId(ctx.params.trackId);

  const src = fs.createReadStream(`./Library/${musicName}.mp3`);

  ctx.response.set('content-type', 'audio/mpeg');

  ctx.body = src;

})//s

router.get('/playlist', async (ctx) => {

  const auth = ctx.request.headers.authorization;

  const token = auth.split(" ")[1];

  //console.log(token);

  const playlist = await getMyPlaylist(token);

  ctx.body = playlist;

})

router.get('/playlist/:playlistId', async (ctx) => {

  const musiclist = await getMusiclistInPlaylist(ctx.params.playlistId);

  ctx.body = musiclist;

})

router.post('/createPlaylist', async (ctx) => {

  const playlist = ctx.request.body;

  const res = await createPlaylist(playlist);

  return res;

})

router.get('/musicList/:albumName', async (ctx) => {

  const musicList = await getMusicByAlbum(ctx.params.albumName);

  //console.log('/musicList is called.');

  ctx.body = musicList;

})

router.get('/image/:albumName', async (ctx) => {

  const src = fs.createReadStream(`./Cover/${ctx.params.albumName}.png`);

  ctx.response.set('content-type', 'image/png');

  //console.log('/image is called.');

  ctx.body = src;

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

app.listen(3030);