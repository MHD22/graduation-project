import React, { Component } from 'react';
import './App.css';
// import { Container } from 'react-bootstrap';
// import CreateClass from '../components/CreateClass';
import NavBar from '../components/NavBar' ;


class App extends Component {
  constructor(){
    super();
    this.state={};
  }
  render(){
    return (
      <div className="App">
        <NavBar />
      </div>
    );
  }
}
export default App;
