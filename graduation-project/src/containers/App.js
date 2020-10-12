import React, { Component } from 'react';
import './App.css';
import Login from '../components/Login' ;
import Register from '../components/Register' ;
import NavBar from '../components/NavBar' ;
import Home from '../components/Home' ;
import About from '../components/About' ;
import {BrowserRouter , Route} from 'react-router-dom' ;
import { Container } from 'react-bootstrap';


class App extends Component {
  constructor(){
    super();
    this.state={};
  }
  render(){
    return (
      <div className="App">
        <BrowserRouter>
        <NavBar />
        <Container>
        <Route exact path="/" component={Home} />
        <Route path="/register" component={Register} />
        <Route path="/login" component={Login} />
        <Route path="/about" component={About} />
        </Container>
        </BrowserRouter>
      </div>
    );
  }
}
export default App;
