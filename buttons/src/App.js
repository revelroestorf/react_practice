import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor() {
    super()
    this.state = {
      clicks: 0,
    }
  }
  click = () => {
    // var x = this.state.clicks += 1
    // this.setState({clicks: x})
    // console.log(this.state.clicks)
  }
  render() {
    // const { clicks } = this.state
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
        </p>
        <button onClick={this.click}>I have been clicked {this.state.clicks} times</button>

      </div>
    );
  }
}

export default App;
