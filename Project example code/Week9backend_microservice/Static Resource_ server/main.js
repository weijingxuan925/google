import Koa from 'koa';

import Router from 'koa-router';

import cors from 'koa2-cors';

import fs from 'fs';

//import { koaBody } from 'koa-body';

const app = new Koa();
const router = new Router();

//app.use(koaBody());
app.use(cors());

router.get('/image/:albumName', async (ctx) => {

    const src = fs.createReadStream(`./Cover/${ctx.params.albumName}.png`);
  
    ctx.response.set('content-type', 'image/png');
  
    ctx.body = src;
  
})

app.use(router.routes(), router.allowedMethods());

app.listen(3031);