import React from 'react'
import axios from 'axios'


// function remove (_id, bookmarksState) {
//   // const { bookmarks } = this.props.app.state
//   const index = bookmarksState.findIndex(bookmark => bookmark._id === _id)
//   if (index >= 0) {
//     const newBookmarks = [...bookmarksState]
//     newBookmarks.splice(index, 1)
//     this.props.app.setState({ newBookmarks })
//   }
//   axios.delete(`http://localhost:4000/bookmarks/${_id}`)
// }

function Bookmark (props) {
  const { _id, title, url, remove, bookmarksState } = props
  return (
    <li>
      {title} (<a href={url} target="_blank">Visit</a>)
      <button onClick={ () => remove(_id, bookmarksState) }>Delete!</button>
    </li>
  )
}

export default Bookmark
