import React, { Component } from 'react';
import socketClient from 'socket.io-client';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      endpoint: 'https://see-the-volume.herokuapp.com/',
      // endpoint: 'http://localhost:3002',
      mode: 'circle',
      sensitivity: 150,
      id: '',
      connected: false,
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
    this.socket.on('mode', data => {
      if (this.state.id === data.id) {
        this.setState({ mode: data.mode });
      }
    });
    this.socket.on('sensitivity', data => {
      if (this.state.id === data.id) {
        this.setState({ sensitivity: data.sensitivity });
      }
    });
    this.socket.on('sendinfo', data => {
      if (this.state.id === data.id) {
        this.setState({ ...data });
      }
    });
  }

  saveToState = e => {
    this.setState({ [e.target.name]: e.target.value, connected: false });
    this.socket.emit('checkid', { id: this.state.id });
  };

  getModeNameFromID() {
    // eslint-disable-next-line
    switch (this.state.mode) {
      case 'noise':
        return 'Smooth Colors';
      case 'random':
        return 'Random Colors (Dubstep)';
      case 'sound':
        return 'Sound-Based Colors (EDM)';
      case 'white':
        return 'Mono-Chrome';
      case 'bubble':
        return 'Chill Mode (lofi)';
      case 'circle':
        return 'Circle Mode (rock/rap/pop)';
      case 'color':
        return 'Danger Mode';
    }
  }

  render() {
    return (
      <div className="content">
        <p>Current Sensitivity: {this.state.sensitivity}</p>
        <p>Current Mode: {this.getModeNameFromID()}</p>
        <button onClick={() => this.changeMode('noise')}>Smooth Colors</button>
        <button onClick={() => this.changeMode('random')}>
          Random Colors (Dubstep)
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
            onClick={() => this.changeSensitvity(this.state.sensitivity - 5)}
          >
            -
          </button>
        </div>
        <div className="half">
          <button
            onClick={() => this.changeSensitvity(this.state.sensitivity + 5)}
          >
            +
          </button>
        </div>
        <div id="KeyInput">
          <p
            style={{
              color: '#bbbbbb',
              marginBottom: 0,
            }}
          >
            Hold the enter key in the visualizer to get the ID and enter it
            below to connect the controller:
          </p>
          <input
            type="text"
            id="idInput"
            name="id"
            value={this.state.id}
            onChange={this.saveToState}
            onBlur={this.saveToState}
            placeholder="id"
            autocapitalize="off"
            style={{
              border: this.state.connected ? '2px solid lime' : '2px solid red',
            }}
          />
        </div>
        <button onClick={() => this.changeMode('color')}>
          <span role="img" aria-label="warn">
            ⚠️
          </span>{' '}
          PRESS AT YOUR OWN RISK
          <span role="img" aria-label="warn">
            ⚠️
          </span>{' '}
        </button>
      </div>
    );
  }
}

export default App;
