import express from 'express';

const app = express();
const POST = 'https://sumsi.dev.webundsoehne.com';

app.listen(POST, () => {
  console.log('Server listen on port: ', POST);
});
