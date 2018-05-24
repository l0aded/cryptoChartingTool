const express = require('express');
const path = require('path');
const parser = require('body-parser');
const fs = require('fs')

const app = express();
const PORT = 3000;
const axios = require('axios')

app.use(parser.json());
app.use(express.static(path.join(__dirname, '../dist')))

app.get('/api/:start/:end', (req, res) => {

  const start = req.params.start;
  const end = req.params.end;
  console.log('start', start);
  console.log('end', end)
  // axios.get('https://api.coindesk.com/v1/bpi/currentprice.json')
  axios.get(`https://api.coindesk.com/v1/bpi/historical/close.json?start=${start}&end=${end}`)
  .then(({data}) => {
    const labels = Object.keys(data.bpi)
    const dataPoints = [];
    for (var key in data.bpi) {
      dataPoints.push(data.bpi[key])
    }
    console.log(dataPoints)
    res.send({
      labels: labels,
      datasets:[{
        label: 'BITCOIN',
        data: dataPoints
      }]
    })
  })
  // .catch((err) => {
  //   console.log(err)
  // })
})



app.listen(PORT, () => {
  console.log("Listening to port: ", PORT)
})
