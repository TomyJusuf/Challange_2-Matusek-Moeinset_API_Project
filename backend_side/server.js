import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import router from './route.js';

const app = express();
const POST = 3000;

app.use(cors());
app.use(bodyParser.json());

// http://localhost:3000/get-data
app.use('/api', router);

app.listen(POST, () => {
  console.log('Server listen on port: ', POST);
});
