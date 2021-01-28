import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import './Nav2.css';
import Login from '../components/Login';
import Register from '../components/Register';
import Home from '../components/Home';
import About from '../components/About';
import CreateClass from '../components/CreateClass';
import MyClasses2 from '../components/MyClasses2';
import { Route, Switch } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Particles from 'react-particles-js';

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

        hamburger_menu.addEventListener("click", () => {
            container.classList.toggle("active");
        })

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


    render() {

        return (
            <>
                <div className="nav-container">
                    <div className="navbar">
                        <div className="menu">
                            <h3 className="logo">Class<span>Image</span></h3>
                            <div className="hamburger-menu">
                                <div className="bar"></div>
                            </div>
                        </div>
                    </div>
                    <div className="main-container">
                        <div className="main">
                            <header>
                                <div className="overlay">
                                    <Particles className="Particles" params={par} />

                                    <Container id="first-container" >
                                        <Switch>
                                            <Route path="/" exact component={Home} />
                                            <Route path="/register" component={Register} />
                                            <Route path="/login" component={Login} />
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
                    <div className="links">
                        <ul>
                            <li >
                                <NavLink style={{ "--i": "0.05s" }} exact to="/">
                                    Home
                                </NavLink>
                            </li>
                            <li>
                                <NavLink style={{ "--i": "0.1s" }} to="/show">
                                    My Classes
                                </NavLink>
                            </li>
                            <li>
                                <NavLink style={{ "--i": "0.15s" }}
                                    to="/create">
                                    Add Class
                                </NavLink>
                            </li>
                            <li>
                                <NavLink style={{ "--i": "0.2s" }} to="/login" hidden={this.state.login}>
                                    Login
                                </NavLink>
                            </li>
                            <li>
                                <NavLink style={{ "--i": "0.25s" }} to="/register" hidden={this.state.login}>
                                    Register
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