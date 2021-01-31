import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import './Nav2.css';
import Home from './Home';
import About from './About';
import CreateClass from './CreateClass';
import MyClasses2 from './MyClasses2';
import { Route, Switch } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Particles from 'react-particles-js';
import Registration from './Registration';

const par = {
    "particles": {
        "number":
            { "value": 30, "density": { "enable": false, "value_area": 800 } },
        "color": { "value": "#39dcff" },
        "shape": { "type": "circle", "opacity": { "value": 1, "random": true, } }
        , "size": { "value": 6, "random": true, },
        "line_linked": { "enable": false, "distance": 250, "color": "#ffffff", "opacity": 0.2, "width": 3 },
        "move": { "enable": true, "speed": 2, }, "interactivity": { "detect_on": "canvas", "events": { "onhover": { "enable": false, "mode": "bubble" }, "onclick": { "enable": false, "mode": "repulse" }, "resize": true }, "modes": { "grab": { "distance": 400, "line_linked": { "opacity": 1 } }, "push": { "particles_nb": 4 }, "remove": { "particles_nb": 4 } } }, "retina_detect": true
    }
};


// "particles":{"number":{"value":80,"density":{"enable":true,"value_area":800}},"color":{"value":"#ffffff"},"shape":{"type":"circle","stroke":{"width":0,"color":"#000000"},"polygon":{"nb_sides":5},"image":{"src":"img/github.svg","width":100,"height":100}},"opacity":{"value":0.5,"random":false,"anim":{"enable":false,"speed":1,"opacity_min":0.1,"sync":false}},"size":{"value":3,"random":true,"anim":{"enable":false,"speed":40,"size_min":0.1,"sync":false}},"line_linked":{"enable":true,"distance":150,"color":"#ffffff","opacity":0.4,"width":1},"move":{"enable":true,"speed":6,"direction":"none","random":false,"straight":false,"out_mode":"out","bounce":false,"attract":{"enable":false,"rotateX":600,"rotateY":1200}}},"interactivity":{"detect_on":"canvas","events":{"onhover":{"enable":true,"mode":"repulse"},"onclick":{"enable":true,"mode":"push"},"resize":true},"modes":{"grab":{"distance":400,"line_linked":{"opacity":1}},"bubble":{"distance":400,"size":40,"duration":2,"opacity":8,"speed":3},"repulse":{"distance":200,"duration":0.4},"push":{"particles_nb":4},"remove":{"particles_nb":2}}},"retina_detect":true





function getUserDataFromSession() {
    return JSON.parse(sessionStorage.getItem('teacher')) || '';
}
class Nav2 extends Component {
    constructor() {
        super();
        this.state = {
            teacherName: '',
            login: false,
        }
    }
    componentDidMount() {
        const hamburger_menu = document.querySelector(".hamburger-menu");
        
        const container = document.querySelector(".nav-container");
        const links = document.querySelectorAll(".links ul li a");
        console.log(links)
        
        hamburger_menu.addEventListener("click", (e) => {
            
            container.classList.toggle("active");
            
        })
        
       document.getElementById('logoutLink').classList.remove('active');
        

        const userData = getUserDataFromSession();
        if (userData) {

            const name = `${userData.firstName} ${userData.lastName}`;
            this.setState({ teacherName: name, login: true });

        }
        else {
            this.setState({ teacherName: '', login: false });
        }
    }

    logOut = () => {
        sessionStorage.clear();
        window.location.reload();
    }
    onClickNavItems = (e)=>{
        if(!e.target.id.includes('navLink')){
            const container = document.querySelector(".nav-container");
            container.classList.toggle("active");
        }

    }


    render() {

        return (
            <>
                <div className="nav-container">
                    <div className="navbar">
                        <div className="menu">
                            <h3 className="logo">Face<span className="orange ">ify</span></h3>
                           
                            <div className="hamburger-menu">
                                <div className="bar"></div>
                            </div>
                            
                        </div>
                            <p hidden={! this.state.login} className="navName">DR.<span>{this.state.teacherName}</span></p>
                    </div>
                    <div className="main-container">
                        <div className="main">
                            <header>
                                    <Particles className="Particles" params={par} />
                                <div className="overlay">
                                        <Container id="first-container" >
                                            <Switch>
                                                <Route path="/" exact component={Home} />
                                                <Route path="/login" component={Registration} />
                                                <Route path="/about" component={About} />
                                                <Route path="/create" component={() => <CreateClass />} />
                                                <Route path="/show" component={MyClasses2} />
                                            </Switch>
                                        </Container>
                                        
                                </div>
                            </header>
                        </div>
                        <div className="nshadow one"></div>
                        <div className="nshadow two"></div>
                        {/* <div class="nshadow three"></div> */}
                        {/* <div className="nshadow four"></div> */}
                    </div>
                    <div className="links" onClick={this.onClickNavItems}>
                        <ul>
                            <li>
                                <p hidden={! this.state.login}  style={{ "--i": "0.02s" }} className="navName2">DR.<span>{this.state.teacherName}</span></p>
                            </li>
                            <li >
                                <NavLink id="navLink1" style={{ "--i": "0.05s" }} exact to="/">
                                    Home
                                </NavLink>
                            </li>
                            <li>
                                <NavLink id="navLink2" style={{ "--i": "0.1s" }} to="/show">
                                    My Classes
                                </NavLink>
                            </li>
                            <li>
                                <NavLink id="navLink3" style={{ "--i": "0.15s" }}
                                    to="/create">
                                    Add Class
                                </NavLink>
                            </li>
                            <li>
                                <NavLink id="navLink4" style={{ "--i": "0.2s" }} to="/login" hidden={this.state.login}>
                                    Login
                                </NavLink>
                            </li>
                            <li>
                                <NavLink id="logoutLink" onClick={this.logOut}  style={{ "--i": "0.25s" }} to="/" hidden={! this.state.login}>
                                    Log out
                                </NavLink>
                            </li>
                        </ul>
                    </div>
                </div>
            </>
        )
    }
}

export default Nav2;