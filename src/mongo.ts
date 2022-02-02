import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

export async function ConnectToMongo() {
  await mongoose
    .connect(process.env.MONGO_URL)
    .then((x) => {
      console.log(x);
      console.log(x.Collection);
    })
    .catch((err) => console.log(err));
}
