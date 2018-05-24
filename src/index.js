/* @flow */

import React from 'react';
import ReactDOM from 'react-dom';
import Chart from './chart';
const axios = require('axios')
//css
require('./css/index.css');

type Props = {||};

// https://api.coindesk.com/v1/bpi/currentprice.json

class App extends React.Component<Props> {
	constructor(props) {
		super(props);
		this.state = {
			btcPrice: 0
		};
		this._fetchPrice = this._fetchPrice.bind(this);
	}

	componentDidMount() {
		this._fetchPrice()
	}

	_fetchPrice(coin) {
		axios.get('https://api.coindesk.com/v1/bpi/currentprice.json')
		.then(({data}) => {
			this.setState({
				btcPrice: data.bpi.USD.rate_float
			})
		})
	}

	render() {
		return (
			<div className="main">
				<h1>Bitcoin (BTC)</h1>
				<h3>REAL-TIME PRICE: {this.state.btcPrice}</h3>
				<Chart />
			</div>
		)
	}
}

const dom = document.getElementById('App')
if (dom === null) {
	//Error
	console.error("dom does not exist")
} else {
	ReactDOM.render(<App />, dom);
}
