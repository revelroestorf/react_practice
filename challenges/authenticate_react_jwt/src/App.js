import React, { Component } from 'react';
import decodeJWT from 'jwt-decode';
import { api, setJwt } from './api/init';
import SignIn from './components/SignIn';
import './App.css';
import Bookmarks from './components/Bookmarks'



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
    bookmarks: localStorage['bookmarks'] ? JSON.parse(localStorage['bookmarks']) : []
  }

  getBookmarks = async () => {
    const resp = await api.get('/bookmarks')
    return resp.data
    // console.log(resp)
  }


  handleSignIn = async (event) => {
    // console.log(localStorage['token'])
    if (localStorage['token']) {
      this.setState({ token: localStorage['token'] })
    } else {

      try {
        const response = await apiSignIn(event)
        this.setState({ token: response.data.token })
        setJwt(response.data.token)
      } catch (error) {
        this.setState({ loginError: error.message })
      }
    }
    const bookmarks = await this.getBookmarks()
    localStorage['bookmarks'] = JSON.stringify(bookmarks)
    this.setState({ bookmarks: bookmarks})
  }


  logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('bookmarks')
    this.setState({bookmarks: [], token: null})

  }

  render() {

    const tokenDetails = this.state.token && decodeJWT(this.state.token)

    const bookmarks = this.state.bookmarks

    return (
      <div className="App">
        { this.state.token && (tokenDetails.exp * 1000) < new Date() ? (
          <div>

            <div>
              <p>
                Welcome { tokenDetails.email }! <br />
                You logged in at: { new Date(tokenDetails.iat * 1000).toLocaleString() }! <br />
                Your token expires at: { new Date(tokenDetails.exp * 1000).toLocaleString() }! <br />
              </p>
              <button onClick={() => this.logout()} >Logout</button>
            </div>

            <Bookmarks bookmarks={bookmarks} />

          </div>

        ) : (
          <SignIn
            loginError={this.state.loginError}
            handleSignIn={this.handleSignIn}
           />
        )}
      </div>
    );
  }

}

export default App;

//
