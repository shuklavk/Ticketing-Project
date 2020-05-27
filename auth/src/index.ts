import express from 'express';
import 'express-async-errors';
import mongoose, { mongo } from 'mongoose';
import cookieSession from 'cookie-session';

import { json } from 'body-parser';
import { currentUserRouter } from './routes/current-user';
import { signInRouter } from './routes/signin';
import { signOutRouter } from './routes/signout';
import { signUpRouter } from './routes/signup';
import { errorHandler } from './middlewares/error-handler';
import { NotFoundError } from './errors/not-found-error';

const app = express();
app.set('trust proxy', true);
const port = 3000;

app.use(json());
app.use(
  cookieSession({
    signed: false,
    secure: true
  })
);

app.use(currentUserRouter);
app.use(signInRouter);
app.use(signOutRouter);
app.use(signUpRouter);

app.all('*', async () => {
  throw new NotFoundError();
});

app.use(errorHandler);

const start = async () => {
  try {
    await mongoose.connect('mongodb://auth-mongo-srv:27017/auth', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
    });
    console.log('connected to mongodb');
  } catch (err) {
    console.log(err);
  }
  app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });
};

start();
