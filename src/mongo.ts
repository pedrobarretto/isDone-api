import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

const conn = mongoose.connection;

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

export function connect() {
  if (conn) return;

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

export { conn };
