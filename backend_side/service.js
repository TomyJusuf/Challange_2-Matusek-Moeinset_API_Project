import axios from 'axios';
const API_URL = 'https://sumsi.dev.webundsoehne.com';
import dotenv from 'dotenv';
dotenv.config();
const database = [];
let headers = {
  'Content-Type': 'application/json',
  Accept: 'application/json',
  Authorization: `Bearer ${process.env.DB_token}`, // Include the token in the Authorization header
};
async function getData(req, res) {
  try {
    const response = await axios.get(`${API_URL}/api/v1/submissions`, {
      headers, // Include the token in the Authorization header
    });

    const responseData = response.data;
    for (let i = 0; i < responseData.data.length; i++) {
      const element = responseData.data[i];
      console.log(responseData.data[i]);
      database.push(element);
    }

    res.status(200).json(database);
    console.log('Data length: ', responseData.data.length);
  } catch (error) {
    console.error(
      'Error making API request:',
      error.response ? error.response.data : error.message
    );

    // Send an error response to the client
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

export { getData };
