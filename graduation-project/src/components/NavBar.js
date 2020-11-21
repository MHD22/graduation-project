import React, { Component } from 'react' ;
import { Navbar , Nav } from 'react-bootstrap';
import {NavLink} from 'react-router-dom' ;

class NavBar extends Component{
    constructor(){
        super();
        this.state={
            teacherName:'',
            login: false ,
        }
    }
    componentDidMount(){
        const data = JSON.parse(sessionStorage.getItem('teacher')) || '';
        if(data){
            const name =`${data.firstName} ${data.lastName}`;
            this.setState({teacherName:name, login:true});

        }
        else{
            this.setState({teacherName:'',login:false});
        }
    }
    
    
   
    render(){
        
        return (
        <>
            <Navbar id="navbar" bg="dark" variant="dark">
                <Navbar.Brand href='/' className="brand-font">Graduation Project</Navbar.Brand>
                <Nav className="mr-auto">
                        <NavLink className="ml-3 nav-font p-1" exact to="/">Home</NavLink>
                        <NavLink className="ml-3 nav-font p-1" to="/about" ></NavLink>
                        <NavLink className="ml-3 nav-font p-1" to="/contact">Contact</NavLink>
                        <NavLink className="ml-3 nav-font p-1" to="/show">My Classes</NavLink>
                        <NavLink className="ml-3 nav-font p-1" to="/create">Add Class</NavLink>
                </Nav>
                <NavLink className="ml-3 nav-font text-light p-1" to="/register" hidden={this.state.login}>Register</NavLink>
                <NavLink className="ml-3 nav-font text-light p-1" to="/Login" hidden={this.state.login}>Login</NavLink>
        <NavLink className="ml-3 nav-font text-light p-1" to="/Login" hidden={!this.state.login}>{this.state.teacherName}</NavLink>
            </Navbar>
        </>
        )
    }
}

export default NavBar ;