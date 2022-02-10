import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

mongoose.connect(process.env.MONGO_URL, {
  dbName: 'is-done',
});

const conn = mongoose.connection;

conn.on('connected', () => {
  console.log('database is connected successfully');
});

conn.on('disconnected', () => {
  console.log('database is disconnected successfully');
});

conn.on('error', console.error.bind(console, 'connection error:'));

export { conn };
