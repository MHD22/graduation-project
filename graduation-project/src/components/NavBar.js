import React, { Component } from 'react' ;
import { Navbar , Nav , NavDropdown} from 'react-bootstrap';
import {NavLink} from 'react-router-dom' ;


function getUserDataFromSession(){
    return JSON.parse(sessionStorage.getItem('teacher')) || '';
}
class NavBar extends Component{
    constructor(){
        super();
        this.state={
            teacherName:'',
            login: false ,
        }
    }
    componentDidMount(){
        const userData = getUserDataFromSession();
        if(userData){

            const name =`${userData.firstName} ${userData.lastName}`;
            this.setState({teacherName:name, login:true});

        }
        else{
            this.setState({teacherName:'',login:false});
        }
    }
    
    logOut = () => {
        sessionStorage.clear() ;
        window.location.reload();
    }
    
   
    render(){
        
        return (
        <>
            <Navbar id="navbar" bg="dark" variant="dark">
                <Navbar.Brand href='/' className="brand-font">Graduation Project</Navbar.Brand>
                <Nav className="mr-auto">
                        <NavLink className="ml-3 nav-font p-1" exact to="/">Home</NavLink>
                        <NavLink className="ml-3 nav-font p-1" to="/about" >About us</NavLink>
                        <NavLink className="ml-3 nav-font p-1" to="/contact">Contact</NavLink>
                        <NavLink className="ml-3 nav-font p-1" to="/show">My Classes</NavLink>
                        <NavLink className="ml-3 nav-font p-1" to="/create">Add Class</NavLink>
                </Nav>
                <NavLink className="ml-3 nav-font text-light p-1" to="/register" hidden={this.state.login}>Register</NavLink>
                <NavLink className="ml-3 nav-font text-light p-1" to="/Login" hidden={this.state.login}>Login</NavLink>
                <NavDropdown className="ml-3 nav-font text-light p-1" title={this.state.teacherName} hidden={!this.state.login}>
                    <NavDropdown.Item className="info">Edit Profile</NavDropdown.Item>
                    <NavDropdown.Item className="info" onClick={this.logOut}>Logout</NavDropdown.Item>
                </NavDropdown>
            </Navbar>
        </>
        )
    }
}

export default NavBar ;