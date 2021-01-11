import React, { Component } from 'react' ;
import {Modal , Button} from 'react-bootstrap' ;
import { Redirect } from "react-router-dom";

class StudentRegister extends Component{
    constructor(){
        super();
        this.state={
            show : false ,
            title : '' ,
            body : '' ,
            redirect : false
        }
    }
    checkThreeImages(file) {
        return file.files.length === 3;
    }
    checkInputData=(e)=> { 
        e.preventDefault();
        let formStudent = document.getElementById('formStudent');
        let firstName= formStudent.firstName.value;
        let lastName= formStudent.lastName.value;
        let password= formStudent.password.value;
        let id_number= formStudent.id_number.value;

        let studentData={firstName,lastName,password,id_number}

        const file=document.getElementById("file");
        var formdata = new FormData();
        formdata.append("image", file.files[0], "file");
        formdata.append("image", file.files[1], "file");
        formdata.append("image", file.files[2], "file");
        console.log("formdata : ", formdata.values());
        
        if(firstName && lastName && password && id_number&& this.checkThreeImages(file) ){
        if (this.checkThreeImages(file)) {
            this.createPerson(formdata,studentData);
            }
        }
        else{
            alert("you should entere all the fields and three images ..");
        }
    }


    createPerson=(file,studentData)=>{
        // check if the name is exist or not ?

        studentData=JSON.stringify(studentData);
        file.append("studentData",studentData);
        var requestOptions = {
            method: 'POST',
            body: file,
            redirect: 'follow'
            };

        fetch('http://localhost:3000/createPerson', requestOptions)
        .then(response => response.json())
        .then(responseStudentData=>{
            // response if added: Student Is Added Successfuly
            // if exist : The Student Is Already Exist
            if(responseStudentData === 'Student Is Added Successfuly'){
                this.setState({
                    title : 'Done' ,
                    body : 'Student Added Successfully ..' ,
                    show : true
                });
            }
            else {
                this.setState({
                    title : 'Error' ,
                    body : 'Student ID is already Used !!' ,
                    show : true
                });
                document.getElementById('id_number').style.boxShadow = "2px 2px 10px red" ;
            }
            console.log(responseStudentData);  
        })
        .catch(e=>{console.log("error while create the person..",e)});   //fffff
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
            <form id="formStudent" hidden={this.state.hideform}>
                <input type="text" id="firstName" placeholder="First Name .." className="form-input mt-4" name="firstName" required />
                <br />
                <input type="text" placeholder="Last Name .." className="form-input mt-4" name="lastName" required/>
                <br />
                <input type="text" id="id_number" placeholder="Student ID .." className="form-input mt-4" name="id_number" required/>
                <br />
                {/* for now it's not used */}
                <input type="password" placeholder="Password .." className="form-input mt-4" name="password" required/>
                <br /> 
                <label htmlFor="file" className="form-input mt-4 pointer dim">Upload your Image</label>
                <input type="file" id="file" className="form-file mt-4" multiple accept="image/*"  required/>
                <br />
                <button type="submit" id='submit'  className="btn btn-success btn-submit mt-4" onClick={this.checkInputData} >
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
export default StudentRegister ;