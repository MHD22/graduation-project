import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import './CreateClass.css';
import { Redirect } from "react-router-dom";
import AddStudents from './AddStudents';

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

    next = (e) => {
        this.setState({ isClickedNext: true});
    }

    componentDidMount() {
        if(this.checkLoggedIn()){
            fetch('http://localhost:3000/students')
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
                <div className="mt-3 bg-black-10 shadow-5 p-5 ">
                    {isClickedNext === false ? 
                    <>
                        <h1 className="main-title">Add Class</h1>
                        <input type="text" placeholder="Class Name" onChange={this.courseName} className="form-input mt-4" required />
                        <br />
                        <Button onClick={this.next} id='submit' className="btn f3 grow btn-success btn-submit mt-4">Next</Button>
                    </>
                        :
                        <AddStudents createNew={true} courseName={this.state.courseName}/>
                    }
                </div>
            </>);
    }
}

export default CreateClass;



