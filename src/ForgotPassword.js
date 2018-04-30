import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import db from './db'

class ForgotPassword extends Component {
    state = {
        email: '',
        errorMessage: ''
    }

    sendEmail = async () => {
        let user = await db.collection("users/email/" + this.state.email).findAll()

        let emailCheck = /.+\@.+\..+/


        if (user.email === this.state.email && emailCheck.test(this.state.email)) {
            let key = Math.random().toString(36).substring(7)
            user.key = key
            await db.collection('users').replaceOne(user._id, user)
            await db.collection('users/resetpassword/' + this.state.email + "/" + key + "/" + user._id).findAll()
        }
        else {
            if (!emailCheck.test(this.state.email))
                this.setState({ errorMessage: "Enter a valid email address" })
            else if (user.email === this.state.email)
                this.setState({ errorMessage: "Not a valid user" })

        }
    }

    render() {
        return (
            <div>
                <input type="email" value={this.state.email} placeholder="Enter Your Email" onChange={
                    (event) => this.setState({ email: event.target.value, error: '' })} />
                <button onClick={() => this.sendEmail()}>Send email</button>

                <p>{this.state.errorMessage}</p>
            </div>
        )
    }
}

export default ForgotPassword