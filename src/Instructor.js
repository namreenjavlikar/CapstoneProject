import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import db from './db'

class Instructor extends Component {

    state = {
        courses: null
    }

    componentWillMount = async () => {
        let courses = await db.collection("courses/instructor/" + sessionStorage.getItem("user_id")).findAll()
        this.setState({courses})
        console.log("Course ->", courses)
    }
    handleCreateExam = async (id) => {
        
    }

    render() {
        return (
            <div>
                {
                    this.state.courses 
                    ?
                    this.state.courses.map(course => 
                        <div>
                            <p>Course -> {course.name} - {course.semester}</p>
                            <button onClick={() => this.handleCreateExam(course._id)}>Create Exam</button>
                        </div>
                    )
                    :
                    <p>Loading</p>
                }
            </div>
        )
    }
}

export default Instructor