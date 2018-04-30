import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom"
import Login from './Login'
import Register from './Register'
import Reset from './Reset'
import ForgotPassword from './ForgotPassword'

import RegisterN from './RegisterNoColor'
class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Route path="/auth/login" component={Login} />
          <Route path="/auth/register" component={Register} />
          <Route path="/auth/reset/:username/:key" component={Reset} />
          <Route path="/auth/forgotpassword" component={ForgotPassword} />
        </div>
      </Router>
    )
  }
}

export default App
