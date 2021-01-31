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
            showTrueSignE:false,
            showFalseSignE:false,

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

        let pattern = /^\d*[A-Za-z]+\w*@zu.edu.jo$/ig;
        let regex = pattern.test(teacherData.email) ;
        // let regex = true;
        if(regex){
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
        else {
            Swal.fire({
                icon: 'error',
                title: 'Oops..',
                html: '<h5 class="text-warning font-lobster mt-2">Email is not valid!</h5>',
            })
        }
    }

    storeTeacherDataInDB = (teacherData) => {
        let { email, id_number } = teacherData;
        let bodyData = { email, id_number };
        let baseUrl = document.getElementById('baseUrl').defaultValue;
        fetch(`${baseUrl}/teachers`, {
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
                        this.setState({ hashedToken });
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
            let baseUrl = document.getElementById('baseUrl').defaultValue;
            fetch(`${baseUrl}/teacherRegister`, {
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
        window.location.replace("http://localhost:3000");
    }

    checkMail =(e)=>{

        let pattern = /^\d*[A-Za-z]+\w*@zu.edu.jo$/ig;
        let regex = pattern.test(e.target.value) ;
        if(regex){this.setState({showTrueSignE:true , showFalseSignE:false});
        }
        else{
        this.setState({showTrueSignE:false , showFalseSignE:true});
        }
        
    }

    render() {

        if (this.state.redirect) {
            return <Redirect to='/' />;
        }

        return (
            <>
                <form id="formTeacher" hidden={this.state.verified}>

                    <label className="label-title ">First Name</label>
                    <input name="fname" id="fname" type="text" />

                    <label className="label-title ">Last Name</label>
                    <input name="lname" id="lname" type="text" />

                    <label className="label-title ">ID Number</label>
                    <input name="t_id" id="t_id" type="text" />

                    <label className="label-title ">E-MAIL</label>
                    <div className="contSigns">
                        <input name="email" id="email" type="email" onChange={this.checkMail} />
                        <span className="spanSign" ><i hidden={ ! this.state.showFalseSignE} className=" fas fa-exclamation errorSign "></i><i hidden={ ! this.state.showTrueSignE} className="far fa-check-circle checkSign"></i></span>
                    </div>

                    <label className="label-title ">PASSWORD</label>
                    <input name="tpassword" id="tpassword" type="password" />

                    <button className="mt4 my-button" onClick={this.newTeacher} >Sign Up</button>

                </form>





            </>
        );
    }
}
export default TeacherRegister;