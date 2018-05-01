import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import db from './db'
import bcrypt from "bcryptjs"

export default class Questions extends Component {
    state = {
        Questions: null
    }


    async componentDidMount() {
        let Questions = await db.collection('Questions').findAll()
        this.setState({ Questions })
    }

    async handleCreate() {
        this.setState({ flag: true })
        this.handleEmail(this.state.email)
        this.handleFirstName(this.state.firstName)
        this.handleLastName(this.state.lastName)
        this.handleCollegeId(this.state.collegeId)
        this.handleDepartment(this.state.dept)
        this.handleRole(this.state.role)
        this.state.flag ?
            db.collection('users').createOne({ collegeId: this.state.collegeId, email: this.state.email, role: this.state.role, name: this.state.firstName + ' ' + this.state.lastName, dept: this.state.dept }) &&
            this.setState({ collegeId: '', email: '', role: '', firstName: '', LastName: '', dept: '' })
            : null
    }

    
    handleFirstName(firstName) {
        let firstNameRegex = /^[a-zA-Z]*$/
        let firstNameMessage = ""
        firstName ?
            firstNameRegex.test(firstName)
                ?
                firstNameMessage = ""
                :
                firstNameMessage = "Error Invalid First Name"
            :
            firstNameMessage = "Please enter an First Name"
        firstNameMessage === '' ? this.setState({ firstNameMessage, flag: false }) : this.setState({ firstNameMessage })
    }



    render() {
        return (
            <div>

               


                <div class="ui left fixed vertical menu" style={{ height: '100vh' }}>
   
                    <a class="item">Instructor List</a>
                    <a class="item">Student List</a>
                    <a class="item">Sign-in</a>


                </div>


                <div style={{ marginLeft: 130, marginRight: 5 }}>


                    <div class="ui raised very padded text container segment" style={{ height: '100vh' }}>
                        <center>
                            <h2 class="ui  header">Create Question</h2>
                        </center>
                        <hr class="uk-divider-icon" />
                        <div class="ui form">

                            <div class="four wide field">
                                <label>Question</label>
                                <input type="text" name="college-id" placeholder={this.state.collegeId} value={this.state.collegeId} onChange={e =>
                                    this.setState({ collegeId: e.target.value })} />
                                <span>{this.state.collegeIdMessage}</span>
                            </div>
                            <div class="four wide field">
                                <label>Answer</label>
                                <input type="text" name="email" placeholder={this.state.email} value={this.state.email} onChange={e =>
                                    this.setState({ email: e.target.value })} />
                                <span>{this.state.emailMessage}</span>
                            </div>
                            
                            
                            
                            <button class="negative ui button" onClick={() => this.handleCreate()}>Add a question </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

