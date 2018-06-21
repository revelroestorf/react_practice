import React, { Component } from 'react';

// const portfolio = [
//   { title: 'First Project', description: 'Well, this is the first project..', link: 'https://www.google.ca/'},
//   { title: 'Second Project', description: 'Well, this is the second project..', link: 'https://www.google.ca/'},
//   { title: 'Third Project', description: 'Well, this is the third project..', link: 'https://www.google.ca/'}
// ]

const Project = (props) => {
  // this arg is for properties
  return (
    <div>
      <h3>{ props.title }</h3>
      <p>{ props.description }</p>
      <a href={ props.link }>link</a>
    </div>
  )
}

export default Project
