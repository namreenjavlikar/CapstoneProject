import React, { Component } from 'react';
import '../node_modules/uikit/dist/css/uikit.css'
import './App.css'
import db from './db'
export default class Login extends Component {

    state = {
        credentials: '',
        messageToUser: '',
        showcredentials: false
    }
    handleLogin = async () => {
        //credentials = "username,password"

        //split into username and password
        let field = this.state.credentials
        const specialCharacter = "."
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

        if (username === "" || password === "" ) {
            this.setState({ messageToUser: "Invalid Input" })
        } else {

            const result = await db.login(username, password)
            console.log("RESULT : ", result)

            if (result) {
                sessionStorage.setItem("token", result.token)
                this.setState({ messageToUser: "" })

            }
            else {
                this.setState({ messageToUser: "Invalid Input" })
            }
        }
    }
    render() {
        return (

            <div className='login-container' >
                <center>
                    <div className="uk-card uk-card-default uk-card-body uk-width-1-4@m  login-card">
                        <h2 className="login-title">Welcome to DMS-Q</h2>
                        <hr className="uk-divider-icon" />
                        <h3 className="login-title">Username.Password</h3>
                        <br />
                        <div style={{ width: '50%'}} >
                            <div className="uk-inline" style={{ width: '100%' }}>
                                {/* <span className="uk-form-icon uk-form-icon-flip" ></span>
                                <span className="uk-form-icon" uk-icon="icon: lock"></span> */}

                                <div className="ui icon input">
                                    <input
                                        type={this.state.showcredentials ? "text" : "password"}
                                        placeholder={this.state.credentials}
                                        value={this.state.credentials}
                                        onChange={e => this.setState({ credentials: e.target.value, messageToUser: '' })} />
                                    <i className={this.state.showcredentials ? "hide link icon" : "unhide link icon"} style={{ fontSize: 22 }}
                                        onClick={() => { this.setState({ showcredentials: !this.state.showcredentials }) }} ></i>
                                </div>
                            </div>
                            <p style={{ color: 'white' }}>{this.state.messageToUser}</p>
                            <div style={{ width: '100%' }}>
                                <button className="fluid ui button" onClick={() => this.handleLogin()} >LOGIN</button>
                            </div>

                        </div>

                        <br />
                        <br />

                        <a href="https://www.w3schools.com" className="login-link">Forgot Your Password?</a>


                    </div>
                </center>

            </div>

        )
    }

}

