import React, { Component } from 'react';
import socketClient from 'socket.io-client';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // endpoint: 'http://10.147.140.5:3002',
      endpoint: 'http://localhost:3002',
      mode: 'white',
      sensitivity: 150,
      id: '',
    };
  }

  changeMode(mode) {
    this.socket.emit('mode', { id: this.state.id, mode });
  }

  changeSensitvity(sensitivity) {
    this.socket.emit('sensitivity', { id: this.state.id, sensitivity });
  }

  componentDidMount() {
    this.socket = socketClient(this.state.endpoint);
    this.socket.on('mode', data => this.setState({ mode: data.mode }));
    this.socket.on('sensitivity', data =>
      this.setState({ sensitivity: data.sensitivity })
    );
  }

  saveToState = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    return (
      <div>
        <p>sensitivity: {this.state.sensitivity}</p>
        <p>mode: {this.state.mode}</p>
        <button onClick={() => this.changeMode('noise')}>Smooth Colors</button>
        <button onClick={() => this.changeMode('random')}>
          Random Colors (skrillex)
        </button>
        <button onClick={() => this.changeMode('sound')}>
          Sound-Based Colors (EDM)
        </button>
        <button onClick={() => this.changeMode('white')}>Mono-Chrome</button>
        <button onClick={() => this.changeMode('bubble')}>
          Chill Mode (lofi)
        </button>
        <button onClick={() => this.changeMode('circle')}>
          Circle Mode (rock/rap/pop)
        </button>
        <p
          style={{
            color: '#bbbbbb',
            marginBottom: 0,
          }}
        >
          Change sensitivity:{' '}
        </p>
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
        <p
          style={{
            color: '#bbbbbb',
            marginBottom: 0,
          }}
        >
          Hold the enter key in the visualizer to get the ID and enter it below
          to connect the controller:
        </p>
        <input
          type="text"
          name="id"
          value={this.state.id}
          onChange={this.saveToState}
          placeholder="id"
        />
        <button onClick={() => this.changeMode('color')}>
          ⚠️ PRESS AT YOUR OWN RISK ⚠️
        </button>
      </div>
    );
  }
}

export default App;
