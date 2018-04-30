import React, { Component } from 'react';
export default class RegisterN extends Component {
    render() {
        return (
            <div>
                <div class="ui left fixed vertical menu">
                    <div class="item">
                        <img class="ui mini image" src="../images/logo.png" />
                    </div>
                    <a class="item">Features</a>
                    <a class="item">Testimonials</a>
                    <a class="item">Sign-in</a>
                </div>
                <div style={{ marginLeft: 121 ,marginRight:50 }}>
                    <div class="ui raised very padded text container segment">
                        <h1 class="uk-heading-divider">College of the North Atlantic - Qatar</h1>
                    </div>

                    <div class="ui raised very padded text container segment" style={{ height: 550 }}>
                        <h4 class="ui dividing header">Create Instructor/Student</h4>
                        <form class="ui form">

                            <div class="eight wide field">
                                <label>College ID</label>
                                <input type="text" name="college-id" placeholder="College ID">
                                </input>
                            </div>
                            <div class="eight wide field">
                                <label>Name</label>
                                <input type="text" name="name" placeholder="Name">
                                </input>
                            </div>
                            <div class="eight wide field">
                                <label>Email</label>
                                <input type="text" name="email" placeholder="email">
                                </input>
                            </div>
                            <div class="eight wide field">
                                <label>Role</label>
                                <div class="field">
                                    <div class="ui selection dropdown">
                                        <input type="hidden" name="role" />
                                        <i class="dropdown icon"></i>
                                        <div class="default text">Role</div>
                                        <div class="menu">
                                            <div class="item" data-value="1">Instructor</div>
                                            <div class="item" data-value="2">Student</div>
                                            <div class="item" data-value="3">Admin assistant</div>

                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/*         <div class="item" data-value="2">Instructor</div>
                                            <div class="item" data-value="1">Student</div>
                                            <div class="item" data-value="0">Admin assistant</div> */}

                            <button class="ui button" type="submit" style={{ backgroundColor: '#DF4A43' }} onClick={() => this.handle()}>Create</button>

                        </form>
                    </div>
                </div>
            </div>

        );
    }
}