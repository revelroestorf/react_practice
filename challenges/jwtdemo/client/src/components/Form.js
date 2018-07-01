import React, { Component } from 'react'
import axios from 'axios'

class Form extends Component {
  constructor(props) {
  super(props)
    this.state = {
      newTitle: '',
      newUrl: ''
    }
}

  setTitle = (e) => {
    this.setState({ newTitle: e.target.value })
  }

  setUrl = (e) => {
    this.setState({ newUrl: e.target.value })
  }

  create = async (e) => {
    const { bookmarks } = this.props.app.state
    e.preventDefault()
    axios.post('http://localhost:4000/bookmarks',
    {title: this.state.newTitle, url: this.state.newUrl})
    .then((bookmark) => {
      this.props.app.setState({ bookmarks: [...bookmarks, bookmark.data] })
    })
  }

  render() {
    const { input1_placeholder, input2_placeholder, buttonName } = this.props

    return (

    <form onSubmit={ this.create }>
      <input placeholder={ input1_placeholder } onChange={ this.setTitle } />
      <input placeholder={ input2_placeholder } onChange={ this.setUrl } />
      <button>{ buttonName }</button>
    </form>

    )
  }
}

export default Form
