import React, { Component } from 'react';
import socketClient from 'socket.io-client';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      endpoint: 'http://10.147.140.5:3002',
      mode: 'white',
      sensitivity: 150,
    };
  }

  changeMode(mode) {
    this.socket.emit('mode', { mode });
  }

  changeSensitvity(sensitivity) {
    this.socket.emit('sensitivity', { sensitivity });
  }

  componentDidMount() {
    this.socket = socketClient(this.state.endpoint);
    this.socket.on('mode', data => this.setState({ mode: data.mode }));
    this.socket.on('sensitivity', data =>
      this.setState({ sensitivity: data.sensitivity })
    );
  }

  render() {
    return (
      <div>
        <p>sensitivity: {this.state.sensitivity}</p>
        <p>mode: {this.state.mode}</p>
        <button onClick={() => this.changeMode('noise')}>Smooth Colors</button>
        <button onClick={() => this.changeMode('random')}>Random Colors</button>
        <button onClick={() => this.changeMode('sound')}>
          Sound-Based Colors
        </button>
        <button onClick={() => this.changeMode('white')}>Mono-Chrome</button>
        <button onClick={() => this.changeMode('bubble')}>Chill Mode</button>
        <button onClick={() => this.changeMode('circle')}>Circle Mode</button>
        <p>Change sensitivity: </p>
        <div className="half">
          <button
            onClick={() => this.changeSensitvity(this.state.sensitivity + 5)}
          >
            +
          </button>
        </div>
        <div className="half">
          <button
            onClick={() => this.changeSensitvity(this.state.sensitivity - 5)}
          >
            -
          </button>
        </div>
        <button onClick={() => this.changeMode('color')}>
          PRESS AT YOUR OWN RISK
        </button>
      </div>
    );
  }
}

export default App;
