import mongoose from 'mongoose';
import config from '../var';

const options = {
  wtimeoutMS: 2500,
  useNewUrlParser: true,
  maxPoolSize: 20,
};

const initDb = async () => {
  await mongoose
    .connect(config.databaseUrl!, options)
    .then(() => {
      console.log(`Connected to database :${config.databaseUrl}`);
    })
    .catch(() => {
      console.log(`Failed to connect to database :${config.databaseUrl}`);
    });
};
export default initDb;
