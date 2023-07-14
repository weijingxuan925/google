import Koa from 'koa';

import Router from 'koa-router';

import cors from 'koa2-cors';

import { koaBody } from 'koa-body';

import jwt from 'koa-jwt';

import { libraryInit } from './LibraryInit.js';

import { getMyPlaylist, getMusiclistInPlaylist, createPlaylist } from './PlaylistService.js';


const app = new Koa();
const router = new Router();

app.use(koaBody());
app.use(cors());

app.use(jwt({ secret: 'my_app_secret' }).unless({ path: [/^\/createPlaylist/] }));

(async () => {

    await libraryInit(); // Connect to database

})();

router.get('/playlist', async (ctx) => {

    const auth = ctx.request.headers.authorization;

    const token = auth.split(" ")[1];

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

app.use(router.routes(), router.allowedMethods());

app.listen(3032);