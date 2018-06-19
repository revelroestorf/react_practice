import React, { Component } from 'react'

class RepoList extends Component {
  constructor(props) {
    super(props)
    console.log('Repolist constructor()')
    this.state = {
      repos: []
    }
  }
  //Depricated because happens before generate dom so no access to dom and can just use constructor for previous stuff
  // Will only happen once
  ComponentWillMount() {
    console.log('Repolist willMount()')
  }
  // Will only happen once
  componentDidMount() {
    console.log('Repolist didMount()')
  }
  // Depricated
  componentWillReceiveProps(nextProps) {
    console.log('Repolist ReceiveProps()')
    // FETCH Requests
    const url = `https://api.github.com/users/google/repos`
    // .json() parses the json and return a js object promise
    fetch(url).then(response => response.json()
    ).then((repoResp) => {setState({
      repos: repoResp
    })
  }
  // true or false
  // If not included here then defaults to true so component will update/re-render.
  // So we can return false under certain circumstances to prevent update when not required - Expensive
  shouldComponentUpdate(nextProps, nextState) {
    console.log('Repolist ShouldUpdate()')
    return true
  }
  componentWillUpdate() {
    console.log('Repolist WillUpdate()')
  }
  componentDidUpdate(prevProps, prevState) {
    console.log('Repolist DidUpdate()')
  }
  // Cleanup - remove event handlers, close db/network connenction, destroy objects etc..
  ComponentWillMount() {
    console.log('Repolist WillMount()')
  }

  render () {
    console.log('Repolist render()')
    return (
      <h2>User Repo List:</h2>
      {
        this.state.repos.map((repo, index) => {
          return (
            <div className="repo-item">
            // see json to see name field is available
              <h3>{repo.name}</h3>
              <p>{repo.description}</p>
              <a href={repo.html_url} target="_blank">
                <small>{repo.html_url}</small>
              </a>
            </div>
          )
        })
      }
    )
  }
}

export default RepoList
