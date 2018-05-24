import React from 'react';
import ReactDOM from 'react-dom';
const axios = require('axios');

const LineChart = require("react-chartjs").Line;

class Chart extends React.Component<Props> {
	constructor(props) {
		super(props);
    this.state = {
      coin: 'BTC',
      start: '2013-10-01',
      end: '2013-11-01',
      data: '',
      chartOptions: ''
    }
    this._handleChange = this._handleChange.bind(this);
  }



  _submitData () {
    axios.get(`/api/${this.state.start}/${this.state.end}`)
    .then(({data}) => {
      this.setState({
        data: data
      })
    })
    .catch((err) => {
      console.log(err);
    })
  }

  _handleChange(e) {
    this.setState({[e.target.name]: e.target.value});
  }


  render() {
    const chartOptions = {
      title: {
        display: true,
        text: 'BITCOIN PRICES'
      }
    }
    return (
      <div>
        {/* <div><label><input type="text" name="coin" placeholder="Coin" value={this.state.coin}  onChange={this._handleChange} /></label></div> */}
        <div><label><input type="text" name="start" placeholder="Start Date" value={this.state.start}  onChange={this._handleChange} /></label></div>
        <div><label><input type="text" name="end" placeholder="End Date" value={this.state.end}  onChange={this._handleChange} /></label></div>
        <div>
          <button onClick={() => this._submitData()}> SUBMIT </button>
        </div>
        <LineChart
          data={this.state.data}
          options={chartOptions}
          width="1000" height="500"
          redraw
        />
      </div>
    )
  }
}


module.exports = Chart
