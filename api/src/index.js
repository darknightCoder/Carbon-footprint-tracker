import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

import { connectDb } from './db';

import device from './routes/device';
import pollution from './routes/pol.control.data';
import session from './routes/session';
import user from './routes/user';

import { pushData } from './scheduler/iot.mock.data';

const app = express();

app.use(cors({}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/devices', device);
app.use('/pollutions', pollution);
app.use('/sessions', session);
app.use('/users', user);
app.get('/healthcheck', async (req, res) => res.sendStatus(200));

pushData().then(() => {
  console.log("Started pushing IOT mock data...");
})

const main = async () => {
  try {
      await connectDb("mongodb://localhost:27017/carbon-footprint");
      app.listen(9090);
      console.log("Application started on port 9090");
  } catch (err) {    
    process.exit(1);
  }
};

main().catch(console.error);
