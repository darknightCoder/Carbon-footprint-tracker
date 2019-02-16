import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

import session from './routes/session';
import user from './routes/user';

const app = express();

app.use(cors({}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/sessions', session);
app.use('/users', user);
app.get('/healthcheck', async (req, res) => res.sendStatus(200));

const main = async () => {
  try {
      app.listen(9090);
      console.log("Application started on port 9090");
  } catch (err) {    
    process.exit(1);
  }
};

main().catch(console.error);
