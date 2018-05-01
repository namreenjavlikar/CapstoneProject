import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import db from './db'
import bcrypt from "bcryptjs"

const collegeIdRegex = /^600[0-9]{5}$/
const nameRegex = /^[a-zA-Z]*$/
const emailRegex = /\S+@\S+\.\S+/
class Register extends Component {
    state = {
        collegeId: '',
        email: null,
        role: null,
        firstName: '',
        lastName: '',
        name: '',
        dept: null,
        collegeIdMessage: '',
        emailMessage: '',
        roleMessage: '',
        firstNameMessage: '',
        lastNameMessage: '',
        deptMessage: '',
        flag: true,
        users: db.collection('users').findAll(),

        courseName: '',
        courseSemester: '',
        instructors: [],
        SelectedInstructor: ""
    }
    async componentDidMount() {
        let users = await db.collection('users').findAll()

        //i did a new query because this functionality is for creating a course, 
        //it should go to some other page, later just cut this part and transfare it to the proper file
        let instructors = await db.collection('users/instructors').findAll()
        console.log("IN", instructors)
        this.setState({ users, instructors })
    }

    async handleRegister() {
        console.log("Registering")
        let key = Math.random().toString(36).substring(7)
        await db.register(this.state.collegeId, "", (this.state.firstName + " " + this.state.lastName), this.state.role, this.state.dept, this.state.email, key)
        await db.collection('users/email/' + this.state.email + "/" + key + "/" + this.state.collegeId).findAll()
    }
    async handleCreate() {
        this.handleEmail(this.state.email)
        this.handleFirstName(this.state.firstName)
        this.handleLastName(this.state.lastName)
        this.handleCollegeId(this.state.collegeId)
        this.handleDepartment(this.state.dept)
        this.handleRole(this.state.role)
        if (this.state.flag) {
            this.handleRegister()
        } else {
            console.log("failed")
        }
    }

    handleEmail(email) {
        let emailRegex = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/
        let check = false
        let emailMessage = ""
        this.state.users.forEach((element, i) => {
            this.state.users[i].email === email ? check = true : null
        })
        email ?
            check ?
                emailMessage = "Error Duplicate Email"
                :
                emailRegex.test(email)
                    ?
                    emailMessage = ""
                    :
                    emailMessage = "Error Invalid Email"
            :
            emailMessage = "Please enter an email"
        emailMessage === '' ? this.setState({ emailMessage, flag: false }) : this.setState({ emailMessage })
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
    handleLastName(lastName) {
        let lastNameRegex = /^[a-zA-Z]*$/
        let lastNameMessage = ""
        lastName ?
            lastNameRegex.test(lastName)
                ?
                lastNameMessage = ""
                :
                lastNameMessage = "Error Invalid First Name"
            :
            lastNameMessage = "Please enter an First Name"
        lastNameMessage === '' ? this.setState({ lastNameMessage, flag: false }) : this.setState({ lastNameMessage })
    }

    handleRoleSelect(role) {
        this.setState({ role })
    }
    handleDepartmentSelect(dept) {
        this.setState({ dept })
    }

    handleRole(role) {
        let roleMessage = ""
        !role ?
            roleMessage = "Please select user's Role"
            :
            roleMessage = ""

        this.setState({ flag: !role ? false : null, roleMessage })
    }
    handleDepartment(dept) {
        let deptMessage = ""
        !dept ?
            deptMessage = "Please select user's Department"
            :
            deptMessage = ""

        this.setState({ flag: !dept ? false : null, deptMessage })
    }
    handleCollegeId(collegeId) {
        let collegeIdRegex = /^600[0-9]{5}$/
        let check = false;
        let collegeIdMessage = ""
        this.state.users.forEach((element, i) => {
            this.state.users[i].collegeId === collegeId ? check = true : null
        })
        collegeId ?
            check ?
                collegeIdMessage = "Error Duplicate College Id"
                :
                collegeIdRegex.test(collegeId)
                    ?
                    collegeIdMessage = ""
                    :
                    collegeIdMessage = "Error Invalid College Id"
            :
            collegeIdMessage = "Please enter an College Id"
        collegeIdMessage === '' ? this.setState({ collegeIdMessage, flag: false }) : this.setState({ collegeIdMessage })
    }

    //for creating a course
    handleInstructorSelect = async (SelectedInstructor) => {
        this.setState({ SelectedInstructor })
    }
    handleCreateCourse = async () => {
        let instructor = this.state.instructors.find(inst => inst._id === this.state.SelectedInstructor)
        await db.collection('courses').createOne({
            name: this.state.courseName,
            semester: this.state.courseSemester,
            instructors: [
                {
                    _id: instructor._id,
                    name: instructor.name
                }
            ]
        })
    }

    render() {
        return (
            <div>
                <div class="ui left fixed vertical menu" style={{ height: '100vh' }}>
                    <div class="item">
                        <img class="ui mini image" src="../images/logo.png" />
                    </div>
                    <a class="item">Instructor List</a>
                    <a class="item">Student List</a>
                    <a class="item">Sign-in</a>
                </div>
                <div style={{ marginLeft: 130, marginRight: 5 }}>


                    <div class="ui raised very padded text container segment" style={{ height: '100vh' }}>
                        <center>
                            <h2 class="ui  header">Register Users</h2>
                        </center>
                        <hr class="uk-divider-icon" />
                        <div class="ui form">

                            <div class="four wide field">
                                <label>College Id</label>
                                <input type="text" name="college-id" placeholder={this.state.collegeId} value={this.state.collegeId} onChange={e =>
                                    this.setState({ collegeId: e.target.value })} />
                                <span>{this.state.collegeIdMessage}</span>
                            </div>
                            <div class="four wide field">
                                <label>Recovery Email</label>
                                <input type="text" name="email" placeholder={this.state.email} value={this.state.email} onChange={e =>
                                    this.setState({ email: e.target.value })} />
                                <span>{this.state.emailMessage}</span>
                            </div>
                            <div class="four wide field">
                                <label>First Name</label>
                                <input type="text" placeholder={this.state.firstName} value={this.state.firstName} onChange={e => this.setState({ firstName: e.target.value })} />
                                <span>{this.state.firstNameMessage}</span>
                            </div>
                            <div class="four wide field">
                                <label>Last Name</label>
                                <input type="text" name="name" placeholder={this.state.lastName} value={this.state.lastName} onChange={e => this.setState({ lastName: e.target.value })} />
                                <span>{this.state.lastNameMessage}</span>
                            </div>
                            <div class="four wide field">
                                <label>Roles</label>
                                <select class="ui search dropdown" onChange={e => this.handleRoleSelect(e.target.value)} >
                                    <option value="">Role</option>
                                    <option value="Student">Student</option>
                                    <option value="Instructor">Instructor</option>
                                    <option value="Admin Assistant">Admin Assistant</option>
                                </select>
                                <span>{this.state.roleMessage}</span>
                            </div>

                            <div class="four wide field">
                                <label>Departments</label>
                                <select class="ui search dropdown" onChange={e => this.handleDepartmentSelect(e.target.value)}>
                                    <option value="">Department</option>
                                    <option value="Information Technology">Information Technology</option>
                                    <option value="Business Studies">Business Studies</option>
                                    <option value="Engineering">Engineering</option>
                                    <option value="Health Sciences">Health Sciences</option>
                                </select>
                                <span>{this.state.deptMessage}</span>
                            </div>
                            <button class="negative ui button" onClick={() => this.handleCreate()}>Register </button>
                            <br />

                            {/* The Code for creating a course starts here */}
                            <p style={{ marginTop: 40 }}>Course Name</p>
                            <input type="text" value={this.state.courseName} onChange={(event) => this.setState({ courseName: event.target.value })} />
                            <p>Course Semester</p>
                            <input type="text" value={this.state.courseSemester} onChange={(event) => this.setState({ courseSemester: event.target.value })} />
                            <p>Instructors</p>
                            <select class="ui search dropdown" placeholder={"Select Instructor"} onChange={(e) => this.handleInstructorSelect(e.target.value)}>
                                <option value="">Select Instructor</option>
                                {
                                    this.state.instructors.map(instructor =>
                                        <option value={instructor._id}>{instructor.name}</option>
                                    )
                                }
                            </select>
                            <button class="negative ui button" onClick={() => this.handleCreateCourse()}>Create Course</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Register;