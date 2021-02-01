import React, { Component } from 'react';
import './App.css';
import Nav from '../components/Nav';
import { BrowserRouter } from 'react-router-dom';
import Footer from '../components/Footer';

class App extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
      <div className="App">
        <BrowserRouter>

          <Nav />
          

         <Footer />
        </BrowserRouter>
        <input id="baseUrl" hidden defaultValue='https://class-take-attendance.herokuapp.com' />
      </div>
    );
  }
}
export default App;
