const express = require('express');
const path = require('path');
const parser = require('body-parser');

const app = express();
const PORT = 3000;
const axios = require('axios')

app.use(parser.json());
app.use(express.static(path.join(__dirname, '../dist')))

app.get('/api/:id', (req, res) => {
  const coinId = req.params.id;
  axios.get('https://api.coindesk.com/v1/bpi/currentprice.json')
  .then(({data}) => {
    console.log(data)
  }
  .catch((err) => {
    console.log(err)
  })
})

app.listen(PORT, () => {
  console.log("Listening to port: ", PORT)
})
