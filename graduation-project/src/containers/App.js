import React, { Component } from 'react';
import './App.css';
import { Container } from 'react-bootstrap';
import CreateClass from '../components/CreateClass';


class App extends Component {
  constructor(){
    super();
    this.state={};
  }
  render(){
    return (
      <Container className="App">
        <CreateClass />
      </Container>
    );
  }
}

export default App;
