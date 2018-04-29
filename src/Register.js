import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import db from './db'
import bcrypt from "bcryptjs"

class Register extends Component {
    state = {
        username: '',
        name: '',
        email: '',
        role: '',
        department: '',
        password: ''
    }

    async handleRegister() {
        await db.register(this.state.username, this.state.password, this.state.name, this.state.role, this.state.department, this.state.email )
    }


    render() {
        return (
            // <div className="App">
            //   <header className="App-header">
            //     <img src={logo} className="App-logo" alt="logo" />
            //     <h1 className="App-title">Welcome to React</h1>
            //   </header>
            //   <p className="App-intro">
            //     To get started, edit <code>src/App.js</code> and save to reload.
            //   </p>
            // </div>
            <div>
                <input type="text" placeholder={this.state.name} value={this.state.name} onChange={e => this.setState({ name: e.target.value })} />
                <button onClick={() => this.handleCreate()}>Submit</button>
                <div>
                    <p>Register starts here</p>
                    <label>Name</label>
                    <input type="text" placeholder={this.state.name} value={this.state.name} onChange={e => this.setState({ name: e.target.value })} />
                    <br /><label>Recovery Email</label>
                    <input type="text" placeholder={this.state.email} value={this.state.email} onChange={e => this.setState({ email: e.target.value })} />
                    <label>UserName</label>
                    <input type="text" placeholder={this.state.username} value={this.state.username} onChange={e => this.setState({ username: e.target.value })} />
                    <br />
                    <br /><label>Password</label>
                    <input type="text" placeholder={this.state.password} value={this.state.password} onChange={e => this.setState({ password: e.target.value })} />

                    <br /><label>Role</label>
                    {/* <select>
                        <option value="Admin">Admin</option>
                        <option value="Instructor">Instructor</option>
                        <option value="Assistant">Assistant</option>
                        <option value="Student">Student</option>
                    </select> */}
                    <input type="text" placeholder={this.state.role} value={this.state.role} onChange={e => this.setState({ role: e.target.value })} />
                    <br /><label>Department</label>
                    {/* <select>
                        <option value="volvo">IT</option>
                        <option value="HS">HS</option>
                        <option value="Business">Business</option>
                        <option value="Engineering">Engineering</option>
                    </select> */}
                    <input type="text" placeholder={this.state.department} value={this.state.department} onChange={e => this.setState({ department: e.target.value })} />
                    <br />
                    <button onClick={() => this.handleRegister()}>Submit</button>
                </div>
            </div>
        );
    }
}

export default Register;
