import React, { Component } from 'react';
import './App.css';
import axios from 'axios'

const api = 'http://localhost:3333/api/students'

const Student = (props) => {
  return <p>{props.name}</p>
}

class App extends Component {
  state = {
    newstudent: '',
    students: []
  }
  componentDidMount() {
    axios.get(api).then(response => {
      // console.log(response)
      this.setState({ students: [...this.state.students, ...response.data] })
      // fetch(api).then(result => {
      //   return result.json()
      // }).then(student => {
      //   this.setState({ students: [...this.state.students, student] })
    })
  }
  changeStudent = (e) => {
    this.setState({
      newstudent: e.target.value
    })
  }
  addStudent = (e) => {
    e.preventDefault()
    axios.post(api, { studentname: this.state.newstudent })
    .then(response => {
      this.setState({ newstudent: '', students: [...this.state.students, ...response.data] })
      // console.log(response.data.data)
    })
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Students</h1>
        </header>
        <form onSubmit={this.addStudent}>
          <label htmlFor="studentname">New Student</label>
          <input id="studentname" onChange={ this.changeStudent } value={ this.state.newstudent } />
        </form>
        <p>{ this.state.newstudent }</p>
        {this.state.students.map((student) => <Student key={ student.id } name={ student.name } />)}
      </div>
    );
  }
}

export default App;
