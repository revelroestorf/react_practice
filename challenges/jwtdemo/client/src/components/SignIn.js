import React from 'react'

const SignIn = ({ handleSignIn, loginError }) => (

  <form onSubmit={handleSignIn}>

    { loginError && <p>{ loginError }</p> }

    <label>Email: <input type="email" name="email" /></label><br />

    <label>Password: <input type="password" name="password" /></label><br />

    <button type="submit">Login</button>
    
  </form>
)

export default
