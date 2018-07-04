import React, { Component } from 'react';
import decodeJWT from 'jwt-decode';
import { api, setJwt } from './api/init';
import SignIn from './components/SignIn';
import './App.css';
import Bookmarks from './components/Bookmarks'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'




const apiSignIn = async (event) => {
  event.preventDefault()
  const form = event.target
  const elements = form.elements
  const response = await api.post('/auth/login', {
    email: elements.email.value,
    password: elements.password.value
  })
  return response
}



class App extends Component {
  state = {
    token: localStorage['token'] || null,
    loginError: null,
    bookmarks: localStorage['bookmarks'] ? JSON.parse(localStorage['bookmarks']) : null
  }

  getBookmarks = async () => {
    console.log('started App getBookmarks()')
    const resp = await api.get('/bookmarks')
    return resp.data
    // console.log(resp)
  }


  handleSignIn = async (event) => {
    console.log('started App handleSignIn()')
    try {
      const response = await apiSignIn(event)
      this.setState({ token: response.data.token })
      setJwt(response.data.token)
    } catch (error) {
      this.setState({ loginError: error.message })
      }
    const bookmarks = await this.getBookmarks()
    this.setState({ bookmarks: bookmarks })
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks))
    // console.log(JSON.parse(localStorage['bookmarks']))

    // console.log(bookmarks)

  }


  logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('bookmarks')
    this.setState({bookmarks: [], token: null})

  }

  render() {

    console.log(this.state.bookmarks)

    const tokenDetails = this.state.token && decodeJWT(this.state.token)

    const bookmarks = this.state.bookmarks

    const server = 'http://localhost:4000'

    // console.log((tokenDetails.exp * 1000) < new Date() ? 'expired' : 'still valid')
    // console.log(new Date(tokenDetails.exp * 1000))
    // console.log(new Date())



    return (
      <div className="App">
        { this.state.token ? (
          <div>

            <div>
              <p>
                Welcome { tokenDetails.email }! <br />
                You logged in at: { new Date(tokenDetails.iat * 1000).toLocaleString() }! <br />
                Your token expires at: { new Date(tokenDetails.exp * 1000).toLocaleString() }! <br />
              </p>
              <button onClick={() => this.logout()} >Logout</button>
            </div>

            <Router>
              <div>
                <button><Link to="/bookmarks">Bookmarks</Link></button>
                <Route path="/bookmarks" render={(routerprops) => (
                  <Bookmarks {...routerprops} bookmarks={bookmarks} />
                )} />
              </div>
            </Router>

          </div>

          ) : (

            <Router>
              <Route path="/" render={(routerprops) => (
                <SignIn {...routerprops} loginError={this.state.loginError} handleSignIn={this.handleSignIn} />
              )} />
            </Router>


        // <SignIn
        //   loginError={this.state.loginError}
        //   handleSignIn={this.handleSignIn}
        //  />

         )}


      </div>
    );
  }

}

export default App;

// <SignIn
//   loginError={this.state.loginError}
//   handleSignIn={this.handleSignIn}
//  />
