const express = require('express');
const axios = require('axios');
const app = express();
const port = 8000;

app.use(express.json());

app.post('/send-name', async (req, res) => {
  const { name, username, email, phone } = req.body;

  // Send the name to Service B
  try {
    // await axios.post('http://localhost:3001/receive-name', { name, username, email, phone });
    await axios.post('http://localhost:4000/add', { name, username, email, phone });
    res.send('Details of user sent to Websocket service api');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error sending');
  }
});

app.listen(port, () => {
  console.log(`Service A listening at http://localhost:${port}`);
});