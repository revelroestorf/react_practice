import React, { Component } from 'react'
import './App.css'

class App extends Component {
  constructor(props) {
    // Always call the super first so we call the super class constructor - Need to do this as our constructor overrides the super constructor
    // No need if don't call constructor.. e.g. just methods
    super()
    this.state = {
      // or seconds: localStorage['seconds'] ? localStorage['seconds'] : 0
      // or form a function: seconds: this.foo() and put foo method below in the class
      seconds: 0,
      //
      user: props.username,

      log: 'in',

      logCount: 0,

      logLog: []
    }
  }
  // had to change the method to function notation to make 'this' point to the object (instance of class) instead of pointing to the event ('this' from where it was called)
  login = () => {
    this.state.logLog = [...this.state.logLog, (new Date().toString())]
    this.state.logCount += 1
    this.state.user == 'admin' ? this.setState({ user: 'guest' }) : this.setState({ user: 'admin' })
    this.state.log == 'in' ? this.setState({ log: 'out'}) : this.setState({ log: 'in'})
  }
  logs() {
    return this.state.logLog.map((logg) => {
      return <li>{logg}</li>
    })
  }
  render() {
    const { logLog, user, seconds } = this.state
    // const logs = logLog.map(log => <li>{log}</li>)
    return (
      <div className="App">
        <p className="App-header">
          You have been here for {seconds} seconds
        </p>
        <p>Hello, { user }</p>
        <button onClick={ this.login }>{ this.state.log }</button>
        <p>You have logged in { this.state.logCount/2 }</p>
        <ul>{ this.logs() }</ul>
      </div>
    );
  }
  // Will call this special method as soon as the object (instance of the class) loads into the dom / mounted onto DOM
  componentDidMount() {
    setInterval(() => {
      this.setState({ seconds: this.state.seconds + 1 })
    }, 1000)
  }
}

export default App;
