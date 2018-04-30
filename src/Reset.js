import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import db from './db'
import bcrypt from "bcryptjs"

class Reset extends Component {
    state = {
        password: '',
        confirmPassword: '',
        user: null,
        error: ''
    }

    componentWillMount = async () => {
        let query = window.location.href
        let username = query.split("/")[5]
        let key = query.split("/")[6]

        let user = await db.collection("users/username/" + username).findAll()
        console.log(user)
        //check ..otherwise redirect
        if (user === null || !username || user.key != key) {
            await this.props.history.push("/auth/login")
        }
        else {
            this.setState({ user })
        }

    }

    handleReset = () => {
        let strongRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/
        if (this.state.password.trim() != '' && this.state.confirmPassword.trim() != '' && this.state.password == this.state.confirmPassword && strongRegex.test(this.state.password)) {
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(this.state.password, salt, async (err, hash) => {
                    let user = this.state.user
                    user.password = hash
                    user.key = ''
                    await db.collection('users').replaceOne(user._id, user)
                })
            })
        } else {
            if (this.state.password.trim() == '' || this.state.confirmPassword.trim() == '')
                this.setState({ error: "Error Empty Field(s)" })
            else if (!strongRegex.test(this.state.password))
                this.setState({ error: "Error not following the validation rule" })
            else if (this.state.password != this.state.confirmPassword)
                this.setState({ error: "Error both password doesn't match" })
        }


    }

    render() {
        return (
            <div>
                <input type="text" value={this.state.password} placeholder="Enter New Password" onChange={
                    (event) => this.setState({ password: event.target.value, error: '' })} />
                <input type="text" value={this.state.confirmPassword} placeholder="Confirm Password" onChange={
                    (event) => this.setState({ confirmPassword: event.target.value, error: '' })} />
                <button onClick={() => this.handleReset()}>Reset</button>
                <p>{this.state.error}</p>
            </div>
        )
    }
}

export default Reset