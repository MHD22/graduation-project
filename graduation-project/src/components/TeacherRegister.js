import React, { Component } from 'react' ;
import {Modal , Button} from 'react-bootstrap' ;
import { Redirect } from "react-router-dom";

class TeacherRegister extends Component{
    constructor(){
        super();
        this.state={}
    }
    newTeacher=(e)=> {
        e.preventDefault();
        let formTeacher = document.getElementById('formTeacher');
        let teacherData ={
        firstName : formTeacher.fname.value,
        lastName : formTeacher.lname.value,
        password : formTeacher.tpassword.value,
        id_number : formTeacher.t_id.value
        }

        this.clearForm() ;
        
        if(teacherData.firstName && teacherData.lastName && teacherData.password && teacherData.id_number){
                this.storeTeacherDataInDB(teacherData) ;    
        }
        else {
            alert("you should enter all the fields.")
        }
    }

    storeTeacherDataInDB=(teacherData) => {
        
        fetch('http://localhost:3000/teachers',{
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify(teacherData),
        })
        .then(res => res.json())
        .then(res=>{
            // response if added :   Teacher Added Successfully
            // if not :          :   Teacher Is Already Exist.
            if(res === 'Teacher Added Successfully'){
                this.setState({
                    title : 'Done' ,
                    body : 'Teacher Added Successfully ..' ,
                    show : true
                });
            }
            else {
                this.setState({
                    title : 'Error' ,
                    body : 'Teacher ID is already Used !!' ,
                    show : true
                });
            }
            console.log(res)
        })
        .catch("error during send Teacher data to backend");
    }; 

    clearForm = () => {
        document.getElementById('fname').value = "" ;
        document.getElementById('lname').value = "" ;
        document.getElementById('t_id').value = "" ;
        document.getElementById('tpassword').value = "" ;
    }

    handleClose = (e) => {
        this.setState({
            show : false 
        }) ;
    }

    done = (e) => {
        this.setState({
            redirect : true
        }) ;
    }

    render(){

        if(this.state.redirect){
            return <Redirect to='/'/>;
        }

        return(
            <>
            <form id="formTeacher">
                <input type="text" id="fname" placeholder="First Name .." className="form-input mt-4" name="fname" required />
                <br />
                <input type="text" placeholder="Last Name .." className="form-input mt-4" id="lname" name="lname" required/>
                <br />
                <input type="text" id="t_id" placeholder="Teacher ID .." className="form-input mt-4" name="t_id" required/>
                <br />
                {/* for now it's not used */}
                <input type="password" placeholder="Password .." className="form-input mt-4" name="tpassword" id="tpassword" required/>
                <br /> 
                <button type="submit" className="btn btn-success btn-submit mt-4" onClick={this.newTeacher} >
                Register
                </button>
            </form>

            <Modal
                show={this.state.show}
                onHide={this.handleClose}
                backdrop="static"
                keyboard={false}
                size = "lg"
                centered
            >

                <Modal.Title className="text-info text-center p-5 font-lobster">{this.state.title}</Modal.Title>

                <Modal.Body className="text-center  font-acme">{this.state.body}</Modal.Body>
                <Modal.Footer>
                <Button variant="primary" className="text-center grow" onClick={this.done}>Done</Button>
                </Modal.Footer>
            </Modal>
            
            </>
        );}
}
export default TeacherRegister ;