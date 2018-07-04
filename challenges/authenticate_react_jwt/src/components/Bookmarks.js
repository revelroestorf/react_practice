import React from 'react'

function Bookmarks (props) {

  console.log('started Bookmarks component')

  return (

    <div>
      <p>{props.bookmarks.map(bookmark => {
        return (
          <li>
            <span>{ bookmark.title }</span>
            <span>{ bookmark.url }</span>
          </li>
        )
      })}</p>
    </div>
  )
}

// <p>{props.bookmarks[0].title}</p>

export default Bookmarks
