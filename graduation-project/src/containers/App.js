import React, { Component } from 'react';
import './App.css';
import Login from '../components/Login' ;
import Register from '../components/Register' ;
import NavBar from '../components/NavBar' ;
import Home from '../components/Home' ;
import About from '../components/About' ;
import CreateClass from '../components/CreateClass' ;
import MyClasses from '../components/MyClasses' ;
import {BrowserRouter , Route,Switch} from 'react-router-dom' ;
import { Container } from 'react-bootstrap';
import Footer from '../components/Footer' ;


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
            <Switch>
              <Route path="/" exact component={Home}/>
              <Route path="/register" component={Register} />
              <Route path="/login" component={Login} />
              <Route path="/about" component={About}/>
              <Route path="/create" component={()=><CreateClass/>} />
              <Route path="/show" component={MyClasses} />
            </Switch>
          </Container>
        </BrowserRouter>
        <Footer />
        <input id="baseUrl" hidden defaultValue='https://class-take-attendance.herokuapp.com' />
      </div>
    );
  }
}
export default App;
