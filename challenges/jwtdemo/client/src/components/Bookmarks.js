import React, { Component } from 'react'
import axios from 'axios'
import Bookmark from './Bookmark'

class Bookmarks extends Component {

  async componentDidMount() {
//    this.setState({ loading: true })
    try {
      const bookmarks = await axios.get(
        'http://localhost:4000/bookmarks'
      )
      this.props.app.setState({ bookmarks: bookmarks.data })
    }
    catch(error) {
      alert("can't get bookmarks!")
    }
  }

  remove = (_id) => {
    const { bookmarks } = this.props.app.state
    const index = bookmarks.findIndex(bookmark => bookmark._id === _id)
    if (index >= 0) {
      const newBookmarks = [...bookmarks]
      newBookmarks.splice(index, 1)
      this.props.app.setState({ bookmarks: newBookmarks })
    }
    axios.delete(`http://localhost:4000/bookmarks/${_id}`)
  }



  render() {
    const { bookmarks } = this.props.app.state
    return (
      <ul>
        {
          bookmarks.map(bookmark =>

            <Bookmark
              key   ={bookmark._id}
              _id   ={bookmark._id}
              title ={bookmark.title}
              url   ={bookmark.url}
              remove={this.remove} />
          )
        }
      </ul>
    )
  }
}

export default Bookmarks
