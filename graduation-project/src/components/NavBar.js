import React from 'react' ;
import { Navbar , Nav } from 'react-bootstrap';
import './NavBar.css' ;

function NavBar(){
    return (
    <>
        <Navbar bg="dark" variant="dark">
            <Navbar.Brand href="#home" className="brand-font">Graduation Project</Navbar.Brand>
            <Nav className="mr-auto nav-font">
                    <Nav.Link href="#home">Home</Nav.Link>
                    <Nav.Link href="#features">About US</Nav.Link>
                    <Nav.Link href="#pricing">Contact</Nav.Link>
            </Nav>
            <Nav className="nav-font">
            <Nav.Link href="#register">Register</Nav.Link>
            <Nav.Link href="#Login">Login</Nav.Link>
            </Nav>
        </Navbar>
    </>
    )
}

export default NavBar ;