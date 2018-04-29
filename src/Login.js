
import React, { Component } from 'react'
import db from './db'

export default class Login extends Component {

    state = {
        credentials: '',
        messageToUser: ''
    }


    async handleLogin() {

        //credentials = "username,password"

        //split into username and password
        let field = this.state.credentials
        const specialCharacter = "/"
        let splitIndex = -1
        for (let i = 0; i < field.length; i++) {
            let c = field.charAt(i)
            if (c === specialCharacter) {
                splitIndex = i
                break
            }
        }
        let username = field.substring(0, splitIndex).trim()
        let password = field.substring(splitIndex + 1).trim()
        
        const result = await db.login(username, password)
        if (result) {
            sessionStorage.setItem("token", result.token)
        }
    }

    render() {
        return (
            <div style={{ padding: 100 }}>
                <h1>Login</h1>
                <hr />
                <input type="text" placeholder={this.state.name} value={this.state.name} onChange={e => this.setState({ name: e.target.value })} />
                <p style={{color: 'red'}}>{this.state.messageToUser}</p>
                <button onClick={() => this.handleLogin()}>Submit</button>
            </div>
        )
    }
}
