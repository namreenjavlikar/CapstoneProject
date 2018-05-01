import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import db from './db'

import { BrowserRouter as Router, Route, Link } from "react-router-dom";

export  class all extends Component {
    state = {
        questions: []
    }


    async componentDidMount() {
        let questions = await db.collection('questions').findAll()
        this.setState({ questions })
    }
     handleCreate() {
        // let questions = await db.collection('questions').findAll()
        // this.setState({ questions })

    }

    render() {
        console.log("questions = " + this.state.questions)
        return (
            <div>
                <div>

                </div>
                <center><h1>Questions</h1>
                </center>
                <br />
                <button className="fluid ui button"  onClick={() => this.props.history.push("/questions/create")}>Create Questions</button>
                <center>
                    <table  striped bordered condensed hover style={{ width: '70%' }} >
                        <thead>
                            <tr><th>Id</th><th>Name</th><th>content</th><th>answer</th><th>Actions</th></tr>
                        </thead>
                        <tbody>
                            {this.state.questions.map(
                                (question) =>
                                    <tr key={question._id}>
                                    <td>{question._id}</td>
                                        <td>{question.name}</td>
                                        <td>{question.content}</td>
                                        <td>{question.answer}</td>
                                        <td>
                                            <center>
                                                {/* <LinkContainer to={'/admincustomers/update/' + question.CustomerId}>
                                                    <BS.Button bsStyle="success">Edit</BS.Button>
                                                </LinkContainer> */}
                                            </center>
                                        </td>
                                    </tr>
                            )}
                        </tbody>
                    </table >
                </center>
            </div>
        )
    }


    



}

export  class create extends Component {
    state = {
        name: "",
        content: '',
        answer: '',

        QuestionsArry: null
    }


    async componentDidMount() {
        let QuestionsArry = await db.collection('questions').findAll()
        this.setState({ QuestionsArry })
    }

    async handleCreate() {
        // this.setState({ flag: true })
        // this.handleEmail(this.state.email)
        // this.handleFirstName(this.state.firstName)
        // this.handleLastName(this.state.lastName)
        // this.handleCollegeId(this.state.collegeId)
        // this.handleDepartment(this.state.dept)
        // this.handleRole(this.state.role)

        db.collection('questions').createOne({ name: this.state.name, content: this.state.content,answer: this.state.answer })
        this.props.history.push("/questions/all")
        // this.state.flag ?
        //     db.collection('users').createOne({ collegeId: this.state.collegeId, email: this.state.email, role: this.state.role, name: this.state.firstName + ' ' + this.state.lastName, dept: this.state.dept }) &&
        //     this.setState({ collegeId: '', email: '', role: '', firstName: '', LastName: '', dept: '' })
        //     : null
    }


    // handleQuestion(val) {
    //     let firstNameRegex = /^[a-zA-Z]*$/
    //     let firstNameMessage = ""
    //     firstName ?
    //         firstNameRegex.test(firstName)
    //             ?
    //             firstNameMessage = ""
    //             :
    //             firstNameMessage = "Error Invalid First Name"
    //         :
    //         firstNameMessage = "Please enter an First Name"
    //     firstNameMessage === '' ? this.setState({ firstNameMessage, flag: false }) : this.setState({ firstNameMessage })
    // }



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
                                <label>Name</label>
                                <input type="text" name="name" placeholder={this.state.name} value={this.state.name} onChange={e =>
                                    this.setState({ name: e.target.value })} />
                            </div>

                            <div class="four wide field">
                                <label>Content</label>
                                <input type="text" name="answer" placeholder={this.state.content} value={this.state.content} onChange={e =>
                                    this.setState({ content: e.target.value })} />
                            </div>

                            <div class="four wide field">
                                <label>Answer</label>
                                <input type="text" name="answer" placeholder={this.state.answer} value={this.state.answer} onChange={e =>
                                    this.setState({ answer: e.target.value })} />
                            </div>

                            <button class="negative ui button" onClick={() => this.handleCreate()}>Add a question </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

