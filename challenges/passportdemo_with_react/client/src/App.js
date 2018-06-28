import React, { Component } from 'react';
import './App.css';
import axios from 'axios'

const LoggedIn = (props) => {
  return (

  <form onSubmit={props.login}>

    <label htmlFor="email">Email</label>
    <input id="email" onChange={props.changeEmail} name="email"></input>

    <label htmlFor="password">Password</label>
    <input  id="email" onChange={props.changePassword} name="password"></input>

    <button type="submit">Login</button>

  </form>
  )
}

class App extends Component {
  state = {
    setRegisterEmail: '',
    setRegisterPassword: '',
    email: '',
    password: '',
    id: '',
    loggedin: false,
  }
  // { email: "bob@bar.com", password: "abc456" }

  changeEmail = (e) => {
    this.setState({email: e.target.value})
  }
  changePassword = (e) => {
    this.setState({password: e.target.value})
  }

  login = (e) => {
    e.preventDefault()
    axios.post("http://localhost:5555/login/", {email: this.state.email, password: this.state.password})
      .then(response => {
      if (response.data.email === this.state.email) {
        this.setState({
          loggedin: true,
          id: response.data._id
        })
      }
      // console.log(response.data._id)
    })
  }

  setRegisterEmail = (e) => {
    this.setState({setRegisterEmail: e.target.value})
  }

  setRegisterPassword = (e) => {
    this.setState({setRegisterPassword: e.target.value})
  }

   register = (e) => {
    e.preventDefault()
    axios.get("http://localhost:5555/register/", {registerEmail: this.state.registerEmail, registerPassword: this.state.registerPassword})
    .then(response => {
      console.log(response)
    })
  }

  render() {
    if(this.state.loggedin) {

      return (
        <div className="App">
          <header className="App-header">
            <h2>You are logged in as: {this.state.id}</h2>
              <form onChange={ this.logout }>
                <button type="submit">Logout</button>
              </form>
          </header>
        </div>
      )
    }

    return (
      <div className="App">
        <header className="App-header">
        </header>

        <LoggedIn login={ this.login } changeEmail={ this.changeEmail} changePassword={ this.changePassword } />

        <form onSubmit={this.register}>

          <label htmlFor="email">Email</label>
          <input id="email" onChange={this.setRegisterEmail} name="email"></input>

          <label htmlFor="password">Password</label>
          <input  id="email" onChange={this.setRegisterPassword} name="password"></input>

          <button type="submit">Register</button>

        </form>
      </div>
    );
  }
}

export default App;
