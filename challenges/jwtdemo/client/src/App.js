import React, { Component } from 'react';
import './App.css';
import Bookmarks from './components/Bookmarks'
import Loading from './components/Loading'
import Form from './components/Form'
import Home from './components/Home'
import Contents from './components/Contents'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import SignIn from './component/SignIn'
import { api, setJwt } from '../api/SignIn'
import decodeJwt from 'jwt-decode'

class App extends Component {
  state = {
    bookmarks: [],
    loading: false,
    token: null,
    loginError: null,
  }

  handleSignIn = async (event) => {
    try {
      event.preventDefault()
      const form = event.target
      const response = await api.post('auth/login', {
        email: form.elements.email.value,
        password: form.elements.password.value
      })
      this.setState({token: response.data.token })
      setJwt(response.data.token)
    } catch (error) {

    }
  }

  render() {
    const tokenDetails = this.state.token && decodeJWT(this.state.token)
    const { bookmarks } = this.state
    return (
      <Router>
        <div>

          <div>

            { this.state.token ?
              ( <h4>Welcome { tokenDetails.email }</h4>
                <p> You are logged in with token: { this.state.token }
                 at: { new Date(tokenDetails.iat * 1000).toLocaleString() } </p>
                 <p>token expires at: { new Date(tokenDetails.exp * 1000).toLocaleString() } </p> )
                 // iat - date thing means: initiated at
              :
              ( <SignIn loginError={this.state.loginError} handleSignIn={this.handleSignIn} )
            }

          </div>

          <Route exact path="/" component={Home} />

          <Link to="/bookmarks">Bookmarks</Link>
          <br/>
          <Link to="/bookmarks/new">New Bookmark</Link>

          { this.state.loading ? <Loading /> : (

            <Route exact path="/bookmarks" render={(props) => (
              <Bookmarks app={this} />
            )} />
            )
          }

          <Route path="/bookmarks/new" render={(props) => (
            <Form
            input1_placeholder = "title"
            input2_placeholder = "url"
            app                = {this}
            buttonName         = "New Bookmark"
            />
          )}
          />

          <Route path="/bookmarks/:id" render={(routeprops) => (
            <Contents app={this} {...routeprops} />
          )} />


        </div>
      </Router>

    )
  }

}

export default App;
