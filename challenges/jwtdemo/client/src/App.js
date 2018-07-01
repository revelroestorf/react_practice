import React, { Component } from 'react';
import './App.css';
import Bookmarks from './components/Bookmarks'
import Loading from './components/Loading'
import Form from './components/Form'
import Home from './components/Home'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'

class App extends Component {
  state = {
    bookmarks: [],
    loading: false,
  }

  render() {
    return (
      <Router>
        <div>
          <Route exact path="/" component={Home} />

          { this.state.loading ? <Loading /> : (

            <Route path="/bookmarks" render={(props) => (
              <Bookmarks app={this} />
            )}  />
            )
          }

          <Route path="/bookmarks/new" render={(props) => (
            <Form {...props}
            input1_placeholder = "title"
            input2_placeholder = "url"
            app = {this}
            buttonName         = "New Bookmark" />
          )}
          />

        </div>
      </Router>

    )
  }

}

export default App;
