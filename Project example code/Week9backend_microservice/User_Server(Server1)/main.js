import Koa from 'koa';

import Router from 'koa-router';

import cors from 'koa2-cors';

import { koaBody } from 'koa-body';

import { userLogin } from './UserLogInService.js';

import { userRegister } from './UserRegisterService.js';

import { libraryInit } from './LibraryInit.js';


const app = new Koa();
const router = new Router();

app.use(koaBody());
app.use(cors());

(async () => {

  await libraryInit(); // Connect to database

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


app.use(router.routes(), router.allowedMethods());

app.listen(3030);