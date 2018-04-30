import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import db from './db'
import bcrypt from "bcryptjs"

const collegeIdRegex = new RegExp('/^600[0-9]{5}$/');
const nameRegex = new RegExp('/^[a-zA-Z]*$/');
const emailRegex = new RegExp('/\S+@\S+\.\S+/');
class Register extends Component {
    state = {
        collegeId: '',
        email: null,
        role: '',
        firstName: '',
        lastName: '',
        name: '',
        dept: '',
        collegeIdMessage: '',
        emailMessage: '',
        roleMessage: '',
        firstNameMessage: '',
        lastNameMessage: '',
        deptMessage: '',
        flag: false,
        users: db.collection('users').findAll()
    }
    async componentDidMount() {
        let users = await db.collection('users').findAll()
        this.setState({ users })
    }

    async handleCreate() {
        this.setState({ flag: true })
        this.handleEmail(this.state.email)
        this.handleFirstName(this.state.firstName)
        this.handleLastName(this.state.lastName)
        this.handleCollegeId(this.state.collegeId)
        this.handleDepartment(this.state.department)
        this.handleRole(this.state.role)
        this.state.flag ?
            db.collection('users').createOne({ collegeId: this.state.collegeId, email: this.state.email, role: this.state.role, name: this.state.firstName + ' ' + this.state.lastName, dept: this.state.dept }) &&
            this.setState({ collegeId: '', email: '', role: '', firstName: '', LastName: '', dept: '' })
            : null
    }

    handleEmail(email) {
        let emailRegex = new RegExp('/^600[0-9]{5}$/');///\S+@\S+\.\S+/');
        let check = false;
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
                    "Error Invalid Email" && this.setState({ flag: false })
            :
            emailMessage = "Please enter an email"
        this.setState({ emailMessage: emailMessage })
    }
    handleFirstName(firstName) {
        let firstNameMessage = nameRegex.exec(firstName) ? "" : "Error Invalid Name" && this.setState({ flag: false })
        this.setState({ firstNameMessage, firstName: firstName })
    }
    handleLastName(lastName) {
        let lastNameMessage = nameRegex.exec(lastName) ? "" : "Error Invalid Name" && this.setState({ flag: false })
        this.setState({ lastNameMessage, lastName: lastName })
    }

    handleRoleSelect(role) {

        let roleMessage = !this.role ? "Please select user's Role" && this.setState({ flag: false }) : null
        this.setState({ roleMessage, role: role })
    }
    handleDepartmentSelect(department) {
        let departmentMessage = !this.department ? "Please select user's Department" && this.setState({ flag: false }) : null
        this.setState({ departmentMessage, department: department })
    }
    handleRole(role) {

        let roleMessage = !this.role ? "Please select user's Role" && this.setState({ flag: false }) : null
        this.setState({ roleMessage, role: role })
    }
    handleDepartment(department) {
        let departmentMessage = !this.department ? "Please select user's Department" && this.setState({ flag: false }) : null
        this.setState({ departmentMessage, department: department })
    }
    handleCollegeId(collegeId) {
        // let check = false;
        // this.state.users.forEach((element, i) => {
        //     this.state.users[i].collegeId == collegeId ? check = true : null
        // });
        // let collegeIdMessage = collegeIdRegex.exec(collegeId) ? "" : "Error Invalid College Id" && this.setState({ flag: false })
        // check ? collegeIdMessage = "Error Duplicate College Id" && this.setState({ flag: false }) : null
        // this.setState({ collegeIdMessage, collegeId: collegeId })

        let check = false;
        let collegeIdMessage = ""
        this.state.users.forEach((element, i) => {
            this.state.users[i].collegeId === collegeId ? check = true : null
        })
        collegeId ?
            check ?
                collegeIdMessage = "Error Duplicate Id"
                :
                collegeIdRegex.exec(collegeId)
                    ?
                    collegeIdMessage = ""
                    :
                    "Error Invalid Id" && this.setState({ flag: false })
            :
            collegeIdMessage = "Please enter an Id"
        this.setState({ collegeIdMessage, collegeId: collegeId })
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
            // <div>
            //     <input type="text" placeholder={this.state.name} value={this.state.name} onChange={e => this.setState({ name: e.target.value })} />
            //     <button onClick={() => this.handleCreate()}>Submit</button>
            //     <div>
            //         <p>Register starts here</p>
            //         <label>Name</label>
            //         <input type="text" placeholder={this.state.name} value={this.state.name} onChange={e => this.setState({ name: e.target.value })} />
            //         <br /><label>Recovery Email</label>
            //         <input type="text" placeholder={this.state.email} value={this.state.email} onChange={e => this.setState({ email: e.target.value })} />
            //         <label>UserName</label>
            //         <input type="text" placeholder={this.state.username} value={this.state.username} onChange={e => this.setState({ username: e.target.value })} />
            //         <br />
            //         <br /><label>Password</label>
            //         <input type="text" placeholder={this.state.password} value={this.state.password} onChange={e => this.setState({ password: e.target.value })} />

            //         <br /><label>Role</label>
            //         {/* <select>
            //             <option value="Admin">Admin</option>
            //             <option value="Instructor">Instructor</option>
            //             <option value="Assistant">Assistant</option>
            //             <option value="Student">Student</option>
            //         </select> */}
            //         <input type="text" placeholder={this.state.role} value={this.state.role} onChange={e => this.setState({ role: e.target.value })} />
            //         <br /><label>Department</label>
            //         {/* <select>
            //             <option value="volvo">IT</option>
            //             <option value="HS">HS</option>
            //             <option value="Business">Business</option>
            //             <option value="Engineering">Engineering</option>
            //         </select> */}
            //         <input type="text" placeholder={this.state.department} value={this.state.department} onChange={e => this.setState({ department: e.target.value })} />
            //         <br />
            //         <button onClick={() => this.handleRegister()}>Submit</button>
            //     </div>
            // </div>
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

                            {/* <label>College Id</label>
                    <input type="text" placeholder={this.state.collegeId} value={this.state.collegeId} onChange={e =>  this.handleCollegeId(e.target.value) && this.setState({ collegeId: e.target.value })} />
                    
                    <br />
                    <label>First Name</label>
                    <input type="text" placeholder={this.state.firstName} value={this.state.firstName} onChange={e => this.setState({ firstName: e.target.value })} />
                    
                    <label> Last Name</label>
                    <input type="text" placeholder={this.state.lastName} value={this.state.lastName} onChange={e => this.setState({ lastName: e.target.value })} />
                    <span>{this.state.firstNameMessage+this.state.lastNameMessage}</span>
                    <br /><label>Recovery Email</label>
                    <input type="text" placeholder={this.state.email} value={this.state.email} onChange={e => this.handleEmail(e.target.value) && this.setState({ email: e.target.value })} />
                    <span>{this.state.emailMessage}</span>*/}

                            <div class="four wide field">
                                <label>College Id</label>
                                <input type="text" name="college-id" placeholder={this.state.collegeId} value={this.state.collegeId} onChange={e =>
                                    //this.handleCollegeId(e.target.value) && 
                                    this.setState({ collegeId: e.target.value })} />
                                <span>{this.state.collegeIdMessage}</span>
                            </div>
                            <div class="four wide field">
                                <label>Recovery Email</label>
                                <input type="text" name="email" placeholder={this.state.email} value={this.state.email} onChange={e =>
                                    //this.handleEmail(e.target.value)&&
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
                                <select class="ui search dropdown" >
                                    <option value="">Role</option>
                                    <option value="Student">Student</option>
                                    <option value="Instructor">Instructor</option>
                                    <option value="Admin assistant">Admin assistant</option>
                                </select>
                            </div>

                            <div class="four wide field">
                                <label>Departments</label>
                                <select class="ui search dropdown">
                                    <option value="">Department</option>
                                    <option value="Information Technology">Information Technology</option>
                                    <option value="Business Studies">Business Studies</option>
                                    <option value="Engineering">Engineering</option>
                                    <option value="Health Sciences">Health Sciences</option>

                                </select>
                            </div>
                            <button class="negative ui button" onClick={() => this.handleCreate()}>Register </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Register;
// import React, { Component } from 'react';

// export default class RegisterN extends Component {
//     render() {
//         return (
//             <div>
//                 <div class="ui left fixed vertical menu">
//                     <div class="item">
//                         <img class="ui mini image" src="../images/logo.png" />
//                     </div>
//                     <a class="item">Features</a>
//                     <a class="item">Testimonials</a>
//                     <a class="item">Sign-in</a>
//                 </div>
//                 <div style={{ marginLeft: 121 ,marginRight:50 }}>
//                     <div class="ui raised very padded text container segment">
//                         <h1 class="uk-heading-divider">College of the North Atlantic - Qatar</h1>
//                     </div>

//                     <div class="ui raised very padded text container segment" style={{ height: 550 }}>
//                         <h4 class="ui dividing header">Create Instructor/Student</h4>
//                         <form class="ui form">

//                             <div class="eight wide field">
//                                 <label>College ID</label>
//                                 <input type="text" name="college-id" placeholder="College ID">
//                                 </input>
//                             </div>
//                             <div class="eight wide field">
//                                 <label>Name</label>
//                                 <input type="text" name="name" placeholder="Name">
//                                 </input>
//                             </div>
//                             <div class="eight wide field">
//                                 <label>Email</label>
//                                 <input type="text" name="email" placeholder="email">
//                                 </input>
//                             </div>
//                             <div class="eight wide field">
//                                 <label>Role</label>
//                                 <div class="field">
//                                     <div class="ui selection dropdown">
//                                         <input type="hidden" name="role" />
//                                         <i class="dropdown icon"></i>
//                                         <div class="default text">Role</div>
//                                         <div class="menu">
//                                             <div class="item" data-value="1">Instructor</div>
//                                             <div class="item" data-value="2">Student</div>
//                                             <div class="item" data-value="3">Admin assistant</div>

//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>
//                             {/*         <div class="item" data-value="2">Instructor</div>
//                                             <div class="item" data-value="1">Student</div>
//                                             <div class="item" data-value="0">Admin assistant</div> */}

//                             <button class="ui button" type="submit" style={{ backgroundColor: '#DF4A43' }} onClick={() => this.handle()}>Create</button>

//                         </form>
//                     </div>
//                 </div>
//             </div>

//         );
//     }
// }