import mongoose, { mongo } from 'mongoose';
import { app } from './app';

const port = 3000;
const start = async () => {
  if (!process.env.JWT_KEY) {
    throw new Error('JWT_KEY is not valid');
  }
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
