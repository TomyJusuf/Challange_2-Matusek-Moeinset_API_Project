import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import router from './route.js';

const app = express();
const PORT = 3000;

app.use(
  cors({
    origin: 'https://sumsi.dev.webundsoehne.com/api/v1/submissions',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // Enable cookies and credentials for cross-origin requests
  })
);
app.use(bodyParser.json());

// http://localhost:3000/get-data
app.use('/api', router);

app.listen(PORT, () => {
  console.log('Server listen on port: ', PORT);
});
