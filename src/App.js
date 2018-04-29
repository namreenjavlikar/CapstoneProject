import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom"
import Login from './Login'
import Register from './Register'

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Route path="/auth/login" component={Login} />
          <Route path="/auth/register" component={Register} />
        </div>
      </Router>
    )
  }
}

export default App
