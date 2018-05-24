import React from 'react';
import ReactDOM from 'react-dom';

const LineChart = require("react-chartjs").Line;

const Chart = ({ chartData, chartOptions }) => {
  return (
    <div>
      <LineChart data={chartData} options={chartOptions} width="600" height="250"/>
    </div>

  )
}


module.exports = Chart
