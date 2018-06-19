import React, { Component } from 'react';
import './App.css';

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      profile: '',
      prevProfile: '',
      loading: true,
      prevUser: false
    }
  }

  componentDidMount() {
    this.fetchRepos()
  }

  fetchRepos = () => {
    this.setState({
      loading: true
    })
    const url = 'https://randomuser.me/api'
    fetch(url).then((resp) => resp.json()).then((promiseObject) => {
      const data = promiseObject.results[0]
      this.setState({
        profile: {
          picture: data.picture.medium,
          name: data.name.first,
          email: data.email,
          phone: data.phone,
        },
        loading: false,
        prevUser: false
      })
    })
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.profile.name !== prevState.profile.name) {
      this.setState({
        prevProfile: prevState.profile
      })
    }
  }
  previousUser = () => {
    this.setState({
      prevUser: true
    })
  }
  render() {
    if (this.state.prevUser) {
      var { picture, name, email, phone, loading } = this.state.prevProfile
    } else {
      const { picture, name, email, phone, loading } = this.state.profile
    }
    console.log(this.state.prevUser)
    if (loading) {
      return (
        <div className="App">
          <header className="App-header">
            <p>Loading...</p>
          </header>
        </div>
      )
    } else {
      return (
        <div className="App">
          <header className="App-header">
            <img src={picture} alt='hi'/>
            <p>{name}</p>
            <p>{email}</p>
            <p>{phone}</p>
          </header>
          <span><button onClick={this.previousUser}>Previous User</button></span>
          <span><button onClick={this.fetchRepos}>Next User</button></span>
        </div>
      )
    }
  }
}

export default App;
