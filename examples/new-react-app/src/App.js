import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Project from './projects'
// import portfolio from './projects'
import NavBar from './navbar'

class App extends Component {
  render() {
    const portfolio = [
      { title: 'First Project', description: 'Well, this is the first project..', link: 'https://www.google.ca/'},
      { title: 'Second Project', description: 'Well, this is the second project..', link: 'https://www.google.ca/'},
      { title: 'Third Project', description: 'Well, this is the third project..', link: 'https://www.google.ca/'}
    ]
    return (
      <div id="bar" className = "foo">
        <NavBar />
        <h1>Portfolio</h1>
          <div>
            { portfolio.map((item) =>
            <Project title={item.title} description={item.description} link={item.link} />)
          }
          </div>
      </div>
    );
  }
}

export default App;
