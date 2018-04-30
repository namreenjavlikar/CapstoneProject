import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import db from './db'

class Email extends Component {

    sendEmail = async () => {
        await db.collection('users/email').findAll()
    }

    render() {
        return (
            <div>
                <button onClick={() => this.sendEmail()}>Send Email</button>
            </div>
        )
    }
}

export default Email