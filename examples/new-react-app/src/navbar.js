import React, { Component } from 'react';
const NavBar = () => {
  // here don't use render as it's just a function, not a class
  return (
    <nav>
      <a href="http://facebook.com">Facebook</a>
      <a href="http://instagram.com">Instagram</a>
    </nav>
  )
}

export default NavBar
