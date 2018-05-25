const express = require('express');
const path = require('path');
const parser = require('body-parser');
const moment = require('moment');

const app = express();
const PORT = 3000;
const axios = require('axios')

app.use(parser.json());
app.use(express.static(path.join(__dirname, '../dist')))

// Fetch historical data from API
app.get('/api/:start/:end', (req, res) => {
  const start = moment(req.params.start).format('YYYY-MM-DD');
  const end = moment(req.params.end).format('YYYY-MM-DD');
  axios.get(`https://api.coindesk.com/v1/bpi/historical/close.json?start=${start}&end=${end}`)
  .then(({data}) => {
    const labels = Object.keys(data.bpi)
    const dataPoints = Object.values(data.bpi)
    res.send({
      labels: labels,
      datasets:[{
        label: 'BITCOIN',
        data: dataPoints
      }]
    })
  })
  .catch((err) => {
    console.log(err)
  })
})

app.listen(PORT, () => {
  console.log("Listening to port: ", PORT)
})
