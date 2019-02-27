import React, { Component } from 'react';
import socketClient from 'socket.io-client';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      endpoint: 'http://localhost:3002',
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
        <button onClick={() => this.changeMode('noise')}>noise</button>
        <button onClick={() => this.changeMode('random')}>random</button>
        <button onClick={() => this.changeMode('sound')}>sound</button>
        <button onClick={() => this.changeMode('color')}>color</button>
        <button onClick={() => this.changeMode('white')}>white</button>
        <button onClick={() => this.changeMode('bubble')}>bubble</button>
        <button onClick={() => this.changeMode('circle')}>circle</button>
        <button
          onClick={() => this.changeSensitvity(this.state.sensitivity + 5)}
        >
          +
        </button>
        <button
          onClick={() => this.changeSensitvity(this.state.sensitivity - 5)}
        >
          -
        </button>
      </div>
    );
  }
}

export default App;
