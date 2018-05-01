import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import db from './db'


export class Create extends Component {

    state = {
        course: null
    }

    componentWillMount = async () => {
        let course = await db.collection("courses").findOne(this.props.match.params._id)
        console.log("For Course -> ", course)
        this.setState({course})
    }

    handleCreateExam = async () => {

    }

    render() {
        return (
            <div>
                <h3>Add a new Exam for {this.state.course.name}</h3>
                <button onClick={() => this.handleCreateExam()}>Create Exam</button>
            </div>
        )
    }
}

export class Edit extends Component {

    sendEmail = async () => {
        await db.collection('users/email/').findAll()
    }

    render() {
        return (
            <div>
                <button onClick={() => this.sendEmail()}>Send Email</button>
            </div>
        )
    }
}