import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const POST = 3000;

app.use(cors());
app.use(bodyParser.json());

const API_URL = 'https://sumsi.dev.webundsoehne.com';

let headers = {
  'Content-Type': 'application/json',
  Accept: 'application/json',
  Authorization: `Bearer ${process.env.DB_token}`, // Include the token in the Authorization header
};

// http://localhost:3000/get-data
app.get('/get-data', async (req, res) => {
  try {
    const response = await axios.get(`${API_URL}/api/v1/submissions`, {
      headers, // Include the token in the Authorization header
    });

    const responseData = response.data;
    res.status(200).json(responseData);
  } catch (error) {
    console.error(
      'Error making API request:',
      error.response ? error.response.data : error.message
    );

    // Send an error response to the client
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(POST, () => {
  console.log('Server listen on port: ', POST);
});
