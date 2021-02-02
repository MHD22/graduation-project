import React, { Component } from 'react';
import { Redirect } from "react-router-dom";
import Swal from 'sweetalert2';

class StudentRegister extends Component {
    constructor() {
        super();
        this.state = {
            show: false,
            title: '',
            body: '',
            redirect: false,
            route: null,
            showTrueSign:false,
            showFalseSign:false,

        }
    }
    checkThreeImages(file) {
        return file.files.length === 3;
    };

    checkInputData = (e) => {
        e.preventDefault();
        let formStudent = document.getElementById('formStudent');
        let firstName = formStudent.firstName.value;
        let lastName = formStudent.lastName.value;
        let id_number = formStudent.id_number.value;

        let studentData = { firstName, lastName, id_number }

        const file = document.getElementById("file");


        if (firstName && lastName && id_number && this.checkThreeImages(file)) {

            var formdata = new FormData();
            formdata.append("image", file.files[0], "file");
            formdata.append("image", file.files[1], "file");
            formdata.append("image", file.files[2], "file");
            this.sendToken(id_number)
                .then(response => {
                    if (response === 'This ID Is Already Exist') {
                        Swal.fire({
                            icon: 'error',
                            title: 'Oops ...',
                            html: `<h5 class="text-danger font-lobster mt-2">${response}</h5>`,
                        })
                    }
                    else {
                        let hashedToken = response;
                        Swal.fire({
                            title: '<h3 class="font-acme">Enter the verification code sent to your email :</3>',
                            icon: 'question',
                            iconHtml: '?',
                            html: '<input type="text" id="studentToken" class="form-control text-center" placeholder="Verification Code" name="token"/>',
                        }).then(() => {
                            this.createPerson(formdata, studentData, hashedToken);
                        });
                    }

                })

        }
        else {
            Swal.fire({
                icon: 'warning',
                title: 'Hmmm ..',
                html: '<h5 class="text-warning font-lobster mt-2">All fields are required<br>And you should enter three images.</h5>',
            })
        }
    }

    sendToken = (id) => {
        let baseUrl = document.getElementById('baseUrl').defaultValue;
        let url = `${baseUrl}/sendTokenStd`;
        let requestOptions =
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id }),
        };
        return fetch(url, requestOptions)
            .then(response => response.json())

    }

    createPerson = (file, studentData, hashedToken) => {
        // check if the name is exist or not ?
        let token = document.getElementById('studentToken').value;
        studentData.token = token;
        studentData.hashedToken = hashedToken;
        studentData = JSON.stringify(studentData);
        file.append("studentData", studentData);
        var requestOptions = {
            method: 'POST',
            body: file,
            redirect: 'follow'
        };
        let baseUrl = document.getElementById('baseUrl').defaultValue;
        fetch(`${baseUrl}/createPerson`, requestOptions)
            .then(response => response.json())
            .then(responseStudentData => {

                if (responseStudentData === 'Student Is Added Successfuly') {

                    Swal.fire({
                        icon: 'success',
                        title: 'Success',
                        html: '<h5 class="text-success font-lobster mt-2">Student Added Successfully</h5>',
                    }).then(() => {
                        this.setState({ route: 'https://mhd22.github.io/graduation-project/' });
                    })
                }
                else if (responseStudentData === "Token is wrong.") {

                    Swal.fire({
                        icon: 'error',
                        title: 'Oops ...',
                        html: '<h5 class="text-danger font-lobster mt-2">Token is wrong! <br> Try again..</h5>',
                    })
                }
                else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops ...',
                        html: `<h5 class="text-danger font-lobster mt-2">Something wrong, try again later, please.</h5>`,
                    })
                    console.log(responseStudentData);
                }
            })
            .catch(e => { console.log("error while create the person..", e) });
    }

    handleClose = (e) => {
        this.setState({
            show: false
        });
    }

    done = (e) => {
        this.setState({
            redirect: true
        });
    }

    checkFiles=(e)=>{
       if(e.target.files.length===3){
           this.setState({showTrueSign:true , showFalseSign:false});
       }
       else{
         this.setState({showTrueSign:false , showFalseSign:true});
       }
    }

    render() {

        if (this.state.redirect) {
            return <Redirect to='https://mhd22.github.io/graduation-project/' />;
        }

        return (
            <>
                {this.state.route ? <Redirect to={this.state.route} /> : null}
                <form id="formStudent" hidden={this.state.hideform}>
    
                    <label className="label-title ">First Name</label>
                    <input name="firstName" id="firstName" type="text" />

                    <label className="label-title ">Last Name</label>
                    <input name="lastName" id="lastName" type="text" />

                    <label className="label-title ">ID Number</label>
                    <input name="id_number" id="id_number" type="text" />

                    <div className="contSigns">
                        <label className="uploadFile mt4 grow dim pointer label-title" htmlFor='file'>Upload 3 Images <i class=" fas fa-cloud-upload-alt"></i></label>
                        <span className="spanSign" ><i hidden={ ! this.state.showFalseSign} className="mmt fas fa-exclamation errorSign "></i><i hidden={ ! this.state.showTrueSign} className=" mmt far fa-check-circle checkSign"></i></span>
                    </div>
                    <input type="file" id="file" className="form-file mt-4" multiple accept="image/*" required onChange={this.checkFiles} />

                    <button className="mt4 my-button" onClick={this.checkInputData} >Sign Up</button>



                </form>







            </>
        );
    }
}
export default StudentRegister;