import React, { Component } from 'react'
import axios from 'axios'

class Contents extends Component {

  async getBookmarks() {
    try {
      const bookmarks = await axios.get(
        'http://localhost:4000/bookmarks'
      )
      this.props.app.setState({ bookmarks: bookmarks.data })
      console.log(this.props.app.state)
    }
    catch(error) {
      alert(error)
    }
    // console.log(routeprops)
    // console.log(props)
  }

  render() {
    return (
      <div>
        <p>{this.getBookmarks()}</p>
      </div>
    )
  }

}

export default Contents
