import React, { Component } from 'react'
import RepoList from './RepoList'
import './App.css'

class App extends Component {
  render() {
    return (
      <div className="App">
        <RepoList user="revelroestorf"/>
      </div>
    )
  }
}

export default App;
