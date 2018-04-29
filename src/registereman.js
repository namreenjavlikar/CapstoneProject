import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import db from './db'
import bcrypt from "bcryptjs"

class Register extends Component {
    state = {
        name: '',
        email: '',
        role: '',
        department: '',
        password: ''
    }

    async handleCreate() {
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(this.state.password, salt, (err, hash) => {
                db.collection('users').createOne({ name: this.state.name, email: this.state.email, role: this.state.role, department: this.state.department, password: hash })
                this.setState({ name: '', email: '', role: '', department: '', password: '' })
            })

        })
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
                    <button onClick={() => this.handleCreate()}>Submit</button>
                </div>
            </div>
        );
    }
}

export default Register;
