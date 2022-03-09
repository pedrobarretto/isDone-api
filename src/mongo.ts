import MongoStore from 'connect-mongo';
// import * as connectMongo from 'connect-mongo';
import dotenv from 'dotenv';
import session from 'express-session';
import mongoose from 'mongoose';

dotenv.config();

const conn = mongoose.connection;

export const sessionStore = new MongoStore({
  mongoUrl: process.env.MONGO_URL,
  collectionName: 'sessions',
});

export function connect() {
  mongoose.connect(process.env.MONGO_URL, {
    dbName: 'is-done',
  });

  conn.on('connected', () => {
    console.log('database is connected successfully');
  });

  conn.on('disconnected', () => {
    console.log('database is disconnected successfully');
  });

  conn.on('error', console.error.bind(console, 'connection error:'));
}

export function disconnect() {
  if (!conn) return;

  mongoose.disconnect();
}
