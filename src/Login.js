import React, { Component } from 'react';
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
      <div>
        <input type="text" placeholder={this.state.name} value = {this.state.name}  onChange={e => this.setState({ name: e.target.value })} />
        <button onClick={() => this.handleCreate()}>Submit</button>
      </div>
    );
  }
}

export default App;
