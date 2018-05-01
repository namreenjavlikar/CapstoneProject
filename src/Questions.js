import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import db from './db'


export  class all extends Component {
    state = {
        questions: []
    }


    async componentDidMount() {
        let questions = await db.collection('questions').findAll()
        this.setState({ questions })
    }

    // render() {
    //     return (
    //         <div>
    //             <div>
    //                 <h3 style={{ paddingLeft: 20 }}>Admin Dashboard</h3>
    //                 <br />

    //             </div>
    //             <center><h1>Admin Customers</h1>
    //                 <BS.Button onClick={this.handleShowAll}>Refresh</BS.Button></center>
    //             <br />
    //             <center>
    //                 <BS.Table striped bordered condensed hover style={{ width: '70%' }} >
    //                     <thead>
    //                         <tr><th>Id</th><th>Username</th><th>name</th><th>age</th><th>gender</th><th>Membership</th><th>Actions</th></tr>
    //                     </thead>
    //                     <tbody>
    //                         {this.state.questions.map(
    //                             (question) =>
    //                                 <tr key={question.CustomerId}>
    //                                     <td>{question.CustomerId}</td>
    //                                     <td>{question.Name}</td>
    //                                     <td>{question.CustomerName}</td>
    //                                     <td>{question.Age}</td>
    //                                     <td>{question.Gender}</td>
                      
    //                                     <td>
    //                                         <center>
    //                                             {/* <LinkContainer to={'/admincustomers/update/' + question.CustomerId}>
    //                                                 <BS.Button bsStyle="success">Edit</BS.Button>
    //                                             </LinkContainer> */}
    //                                         </center>
    //                                     </td>
    //                                 </tr>
    //                         )}
    //                     </tbody>
    //                 </BS.Table>
    //             </center>
    //         </div>
    //     )
    // }


    



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

        db.collection('questions').createOne({ name: this.state.name, answer: this.state.answer })

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
                                <label>content</label>
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

