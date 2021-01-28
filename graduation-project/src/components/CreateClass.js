import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import './CreateClass.css';
import { Redirect } from "react-router-dom";
import AddStudents from './AddStudents';
import Swal from 'sweetalert2' ;
import './table.css' ;

class CreateClass extends Component {
    constructor() {
        super();
        this.state = {
            isClickedNext: false,
            image: null,
            url: '',
            search:'' ,
            courseName : '' ,
            show : false ,
            title : '' ,
            body : '' ,
            redirect : false,
            route:null
        }
    }

    //To Check if LoggedIn .
    checkLoggedIn = () => {
        const data = sessionStorage.getItem('teacher') ;
        if(!data){
            this.setState({route:'/login'});
            return false;
        }
        else {
            return true;
        }
    }

    opensweetalertdanger = () => {
        Swal.fire({
            icon: 'error',
            title: 'Oops ..! ',
            html: '<h5 class="text-danger">Class Name is already Exist !</h5>',
          })
    }

    next = (e) => {
        let baseUrl= document.getElementById('baseUrl').defaultValue;
        fetch(`${baseUrl}/checkClass/${this.state.courseName}`)
        .then(res => res.json())
        .then(data => {
            console.log(data) ;
            if(data){
                this.opensweetalertdanger() ;
            }
            else {
                this.setState({ isClickedNext: true}); 
            }
        })
    }

    componentDidMount() {
        if(this.checkLoggedIn()){
            let baseUrl= document.getElementById('baseUrl').defaultValue;
            fetch(`${baseUrl}/students`)
            .then(res=> res.json()).then(data=>{
                this.setState({students:data} , ()=>{console.log(this.state.students)});
            })
            .catch(e=>console.log(e));
        }
    }

    courseName = (e) => {
        let cName = e.target.value ;
        console.log(cName) ;
        this.setState({
            courseName : cName
        })
    }

    render() {

        const { isClickedNext } = this.state;
      
        return (
            <>
                {this.state.route? <Redirect to={this.state.route}/>:null}
                <div className="p-5">
                    {isClickedNext === false ? 
                    <>
                        <h1 className="main-title">Create new Class</h1>
                        <input type="text" placeholder="Class Name" onChange={this.courseName} className="new-input mt-3" required />
                        <br />
                        <Button onClick={this.next} id='submit' className="btn f3 grow btn-success next-btn mt-4">Next</Button>
                    </>
                        :
                        <AddStudents createNew={true} courseName={this.state.courseName}/>
                    }
                </div>
            </>);
    }
}

export default CreateClass;



