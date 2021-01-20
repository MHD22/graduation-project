import React, { Component } from 'react';
import { Redirect } from "react-router-dom";
import Swal from 'sweetalert2';

class TeacherRegister extends Component {
    constructor() {
        super();
        this.state = {
            verified: false,
            teacherData: {},
            hashedToken: '',
            route: null,

        }
    }
    newTeacher = (e) => {
        e.preventDefault();
        let formTeacher = document.getElementById('formTeacher');
        let teacherData = {
            firstName: formTeacher.fname.value,
            lastName: formTeacher.lname.value,
            email: formTeacher.email.value,
            password: formTeacher.tpassword.value,
            id_number: formTeacher.t_id.value,
        }
        this.setState({ teacherData });

        // this.clearForm() ;

        if (teacherData.firstName && teacherData.lastName && teacherData.password && teacherData.id_number && teacherData.email) {
            this.storeTeacherDataInDB(teacherData);
        }
        else {
            Swal.fire({
                icon: 'warning',
                title: 'Hmmm ..',
                html: '<h5 class="text-warning font-lobster mt-2">All fields are required</h5>',
            })
        }
    }

    storeTeacherDataInDB = (teacherData) => {
        let { email, id_number } = teacherData;
        let bodyData = { email, id_number };
        fetch('http://localhost:3000/teachers', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(bodyData),
        })
            .then(res => res.json())
            .then(res => {

                if (res === 'Teacher Is Already Exist.') {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops ...',
                        html: '<h5 class="text-danger font-lobster mt-2">Teacher Email or ID is already exist</h5>',
                    })
                }
                else {
                    let start = res.indexOf('token:'); //5
                    if (start !== -1) {
                        let hashedToken = res.slice(6);
                        this.setState({ hashedToken })
                        document.getElementsByClassName('registerAsButton')[0].style.display = 'none';
                        document.getElementsByClassName('registerAsButton')[1].style.display = 'none';
                        Swal.fire({
                            title: '<h3 class="font-acme">Enter the verification code sent to your email :</3>',
                            icon: 'question',
                            iconHtml: '؟',
                            html: '<input type="text" id="token" class="form-control text-center" placeholder="Verification Code" name="token"/>',
                        }).then(() => {
                            this.saveTeacher();
                        });
                    }
                    else {
                        Swal.fire({
                            icon: 'error',
                            title: 'Oops ...',
                            html: '<h5 class="text-danger font-lobster mt-2">Something wrong , pleaase try again later</h5>',
                        })
                    }
                }
            })
            .catch("error during send Teacher data to backend");
    };

    clearForm = () => {
        document.getElementById('fname').value = "";
        document.getElementById('lname').value = "";
        document.getElementById('t_id').value = "";
        document.getElementById('tpassword').value = "";
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
    saveTeacher = () => {
        console.log("Hello world!!");
        let token = document.getElementById('token').value;
        if (token) {
            let teacherData = Object.assign({}, this.state.teacherData);
            let { hashedToken } = this.state;
            teacherData.hashedToken = hashedToken;
            teacherData.token = token;
            console.log(teacherData, " <= teacher data.  ");

            fetch('http://localhost:3000/teacherRegister', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(teacherData),
            })
                .then(res => res.json())
                .then(res => {
                    if (res === 'Teacher Added Successfully') {
                        Swal.fire({
                            icon: 'success',
                            title: 'Success',
                            html: '<h5 class="text-success font-lobster mt-2">Teacher Added Successfully</h5>',
                        })
                        this.storedUserInSession(this.state.teacherData);
                        setTimeout(() => {
                            this.goToHomePage();
                        }, 2000);
                    }
                    else {
                        Swal.fire({
                            icon: 'error',
                            title: 'Oops ..!',
                            html: '<h5 class="text-danger font-lobster mt-2">Invalid Token</h5>',
                        })
                    }
                })
                .catch(e => { console.log("error when storing teacher data with the tokens.", e) });
        }
        else {
            Swal.fire({
                icon: 'error',
                title: 'Oops ..!',
                html: '<h5 class="text-danger font-lobster mt-2">Invalid Token</h5>',
            })
        }
    }
    storedUserInSession = (userData) => {
        const { firstName, lastName, id_number } = userData;
        const storedData = { firstName, lastName, id_number };
        sessionStorage.setItem('teacher', JSON.stringify(storedData));
    }
    goToHomePage = () => {
        window.location.replace("http://localhost:3001");
    }

    render() {

        if (this.state.redirect) {
            return <Redirect to='/' />;
        }

        return (
            <>
                <form id="formTeacher" hidden={this.state.verified}>
                    <input type="text" id="fname" placeholder="First Name .." className="form-input mt-4" name="fname" required />
                    <br />
                    <input type="text" placeholder="Last Name .." className="form-input mt-4" id="lname" name="lname" required />
                    <br />
                    <input type="email" placeholder="Email .." className="form-input mt-4" id="email" name="email" required />
                    <br />
                    <input type="text" id="t_id" placeholder="Teacher ID .." className="form-input mt-4" name="t_id" required />
                    <br />
                    <input type="password" placeholder="Password .." className="form-input mt-4" name="tpassword" id="tpassword" required />
                    <br />
                    <button type="submit" className="btn btn-success btn-submit mt-4" onClick={this.newTeacher} >
                        Register
                </button>
                </form>
                {/* <form hidden={! this.state.verified} >
                <fieldset >
                    <legend>Verification</legend>
                    <label htmlFor="token">Enter your access token Which sent on your email:</label>
                    <br/>
                    <input type="text" id="token" placeholder="Access token" className="form-input mt-4" name="token" required />
                    <br/>
                    <input type="submit" className="btn btn-success btn-submit mt-4" onClick={this.saveTeacher} value="OK!"/>     
                </fieldset>
            </form> */}

            </>
        );
    }
}
export default TeacherRegister;