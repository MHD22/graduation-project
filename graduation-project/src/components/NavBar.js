import React from 'react' ;
import { Navbar , Nav } from 'react-bootstrap';
import './NavBar.css' ;
import {NavLink} from 'react-router-dom' ;

function NavBar(){
    return (
    <>
        <Navbar bg="dark" variant="dark">
            <Navbar.Brand href="#home" className="brand-font">Graduation Project</Navbar.Brand>
            <Nav className="mr-auto">
                    <NavLink className="ml-3 nav-font p-1" exact to="/">Home</NavLink>
                    <NavLink className="ml-3 nav-font p-1" to="/about">About US</NavLink>
                    <NavLink className="ml-3 nav-font p-1" to="/contact">Contact</NavLink>
            </Nav>
            <NavLink className="ml-3 nav-font text-light p-1" to="/register">Register</NavLink>
            <NavLink className="ml-3 nav-font text-light p-1" to="/Login">Login</NavLink>
        </Navbar>
    </>
    )
}

export default NavBar ;