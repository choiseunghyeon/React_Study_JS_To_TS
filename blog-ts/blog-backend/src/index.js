import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import Router from 'koa-router';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

import api from './api/index.js';

dotenv.config();

const { PORT, MONGO_URI } = process.env;

mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useFindAndModify: false })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error(error);
  });

const app = new Koa();
const router = new Router();

// /api 라우트 적용
router.use('/api', api.routes());

// 라우터 전에 적용
app.use(bodyParser());
//app.use(jwtMiddleware);

app.use(router.routes()).use(router.allowedMethods());

const port = PORT || 4000;
app.listen(port, () => {
  console.log('Listening to port %d', port);
});
