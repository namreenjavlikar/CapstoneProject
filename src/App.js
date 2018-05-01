import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom"
import Login from './Login'
import Register from './Register'
import Reset from './Reset'
import ForgotPassword from './ForgotPassword'
import Instructor from './Instructor'
import * as Questions from './Questions'

import RegisterN from './RegisterNoColor'
import * as Exams from './Exams'

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Route path="/auth/login" component={Login} />
          <Route path="/auth/register" component={Register} />
          <Route path="/auth/reset/:username/:key" component={Reset} />
          <Route path="/auth/forgotpassword" component={ForgotPassword} />
          <Route path="/Instructor" component={Instructor} />

          <Route path="/Exams/Create/:_id" component={Exams.Create} />
          <Route path="/Exams/Edit/:_id" component={Exams.Edit} />

          <Route path="/questions/all" component={Questions.all} />
          <Route path="/questions/create" component={Questions.create} />

        </div>
      </Router>
    )
  }
}

export default App
