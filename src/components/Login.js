import React from 'react';
import { Component } from 'react';
import Swal from 'sweetalert2';

class Login extends Component {
    constructor() {
        super();
        this.state = {
            isForgotClicked: false,
            // showSentToken: false,
            email: '',
            newPass: '',
            hashedToken: '',
            token: '',
            route: null
        }
    }

    checkId = (event) => {

        event.preventDefault();
        const form = document.getElementById('signInForm');
        let user = { id: form.teacherId.value, password: form.teacherPassword.value };

        if (user.id && user.password) {
            checkTheUserData(user)
                .then(userData => {

                    if (isUserLoggedIn(userData)) {
                        storedUserInSession(userData);
                        goToHomePage();
                    }
                    else {
                        Swal.fire({
                            icon: 'error',
                            title: 'Oops ...',
                            html: '<h5 class="text-danger font-lobster mt-2">Email OR Password Is Wrong<br>Try again.</h5>',
                        })
                    }

                })
                .catch(e => { console.log("error during send user data to backend within the sign in page.") });
        }
        else {
            Swal.fire({
                icon: 'warning',
                title: 'Hmmm ..',
                html: '<h5 class="text-warning font-lobster mt-2">All fields are required</h5>',
            })
        }

    }

    resetPassHandler = (e) => {
        let token = document.getElementById('resetToken').value;
        let { email, newPass, hashedToken } = this.state;
        let bodyData = { email, newPass, token, hashedToken };
        let baseUrl = document.getElementById('baseUrl').defaultValue;
        let url = `${baseUrl}/resetPass`;
        let requestOptions =
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(bodyData),
        };
        fetch(url, requestOptions)
            .then(res => res.json())
            .then(response => {
                if (response === 'done') {
                    Swal.fire({
                        icon: 'success',
                        title: 'Success',
                        html: '<h5 class="text-success font-lobster mt-2">Password Is Changed Successfully</h5>',
                    })
                    this.setState({ isForgotClicked: false });
                    this.clearForms();
                }
                else if (response === 'Token is wrong.') {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops ...',
                        html: '<h5 class="text-danger font-lobster mt-2">Token is wrong! <br> Try again..</h5>',
                    })
                }

                console.log(response);
            })

    }

    showResetForm = () => {
        this.setState({ isForgotClicked: true });
    }
    showLoginForm = () => {
        this.setState({ isForgotClicked: false });
    }

    getAccessToken = (e) => {
        e.preventDefault();
        let resetForm = document.getElementById('resetPassForm');
        let email = resetForm.email.value;
        let newPass = resetForm.newPass.value;
        if (email && newPass) {
            this.setState({ email, newPass });
            let baseUrl = document.getElementById('baseUrl').defaultValue;
            let url = `${baseUrl}/sendToken`;
            let requestOptions =
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email }),
            };
            fetch(url, requestOptions)
                .then(result => result.json())
                .then(response => {
                    if (response === 'This email is not registered yet.') {
                        Swal.fire({
                            icon: 'error',
                            title: 'Oops ...',
                            html: `<h5 class="text-danger font-lobster mt-2">${response}</h5>`,
                        })
                    }
                    else if (response === 'error within checking the teacher existance') {
                        Swal.fire({
                            icon: 'error',
                            title: 'Oops ...',
                            html: `<h5 class="text-danger font-lobster mt-2">Something wrong, try again later, please.</h5>`,
                        })
                    }
                    else {
                        this.setState({ hashedToken: response, showSentToken: true });
                        Swal.fire({
                            title: '<h3 class="font-acme">Enter the verification code sent to your email :</3>',
                            icon: 'question',
                            iconHtml: '?',
                            html: '<input type="text" id="resetToken" class="form-control text-center" placeholder="Verification Code" name="token"/>',
                        }).then(() => {
                            this.resetPassHandler();
                        });

                    }
                })
                .catch(e => { console.log("error when getting the hashed token..") });
        }
        else {
            Swal.fire({
                icon: 'warning',
                title: 'Hmmm ..',
                html: '<h5 class="text-warning font-lobster mt-2">All fields are required</h5>',
            })
        }

    }

    clearForms = () => {
        let form = document.getElementById('signInForm');
        let form2 = document.getElementById('resetPassForm');
        form.teacherId.value = '';
        form.teacherPassword.value = '';
        form2.email.value = '';
        form2.newPass.value = '';

    }

    render() {
        return (
            <>
                <div hidden={this.state.isForgotClicked}>
                    <form className="mt-3" id='signInForm' >
                        {/* <input name='teacherId' type="text" placeholder="Teacher ID .." className="form-input mt-4" required />
                        <br />
                        <input name='teacherPassword' type="password" placeholder="Password.." className="form-input mt-4" required />
                        <br />
                        <input type="submit" id='submit' onClick={this.checkId} value="Login" className="btn btn-success btn-submit mt-4" /> */}
                        <label className="label-title ">ID Number</label>
                        <input name='teacherId' type="text" />

                        <label className="label-title ">PASSWORD</label>
                        <input name='teacherPassword' type="password" />
                        <button onClick={this.checkId} className="mt4 my-button ">Sign In</button>

                    </form>
                    <p onClick={this.showResetForm} className="mt4 pointer grow "><span className="forget">Forgot Password?</span></p>
                </div>
                <div hidden={!this.state.isForgotClicked}>
                    {/* <h2 className="main-title ma3" >Reset Password</h2> */}
                    <form className="mt-3" id='resetPassForm' >
                        <div>
                            <label className="label-title " >Email</label>
                            <input name='email' type="email" />
                            <label className="label-title ">New Password</label>
                            <input name='newPass' type="password" />
                            <button onClick={this.getAccessToken} className="mt4 my-button ">Send Token</button>
                        </div>
                    </form>
                    <p onClick={this.showLoginForm} className="mt4 pointer grow label-title "><span className="forget">login?</span></p>
                </div>

               
            </>





        );
    }
}
export default Login



//helper functions:


function isUserLoggedIn(userData) {
    if (userData.length === 1) {
        return true;
    }
    return false;
}

function storedUserInSession(userData) {
    const { firstName, lastName, id_number } = userData[0];
    const storedData = { firstName, lastName, id_number };
    sessionStorage.setItem('teacher', JSON.stringify(storedData));
}

function goToHomePage() {
    window.location.replace("http://localhost:3000");
}

function checkTheUserData(user) {
    let baseUrl = document.getElementById('baseUrl').defaultValue;
    return fetch(`${baseUrl}/loginTeacher`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
    })
        .then(res => res.json())

}