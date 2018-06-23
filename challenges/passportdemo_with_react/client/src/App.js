import React, { Component } from 'react';
import './App.css';
import axios from 'axios'

class App extends Component {
  state = {}
  // { email: "bob@bar.com", password: "abc456" }

  loginDeets = () => {
    this.setState({
      email: "bob@bar.com",
      password: "abc456"
    })
  }

  login = () => {
    axios.post("http://localhost:5555/login/", ).then(response => {
      console.log(response)
    })
    return console.log(this.props)
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">

        </header>
        <h4 className="App-intro">

        <form onSubmit={this.login}>

          <label htmlFor="email">Email</label>
          <input id="email" name="email"></input>

          <label htmlFor="password">Password</label>
          <input  id="email" onChange={this.loginDeets} name="password"></input>

          <button type="submit">Login</button>

        </form>

        </h4>
      </div>
    );
  }
}

export default App;
