import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import db from './db'

class App extends Component {
  state = {
    name: '',
  }

  async handleCreate() {
    console.log("SDFSDf" + this.state.name)
    await db.collection('users').createOne({ name: this.state.name })
    this.setState({ name: '' })
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
        <input type="text" placeholder={this.state.name} value = {this.state.name}  onChange={e => this.setState({ name: e.target.value })} />
        <button onClick={() => this.handleCreate()}>Submit</button>
      </div>
    );
  }
}

export default App;
