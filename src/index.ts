import http from 'http';
import * as dotenv from 'dotenv';
import path from 'path';
import initDb from './app/config/db';
import app from './app/app';
import config from './app/config/var';

const envPath = path.resolve(__dirname, '../.env');
dotenv.config({ path: envPath });

const server = http.createServer(app);

async function startServer() {
  await initDb();
  server.listen(config.port, () => {
    console.log(`Listening on port ${config.port}...`);
  });
}

startServer();
