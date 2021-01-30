import React from 'react';
import { Component } from 'react';
import Swal from 'sweetalert2';
import '../styles/registration.css';
import $ from 'jquery';
import ReactCardFlip from 'react-card-flip';
import TeacherRegister from './TeacherRegister';
import StudentRegister from './StudentRegister';
import Login from './Login';

class Registration extends Component {
    constructor() {
        super();
        this.state = {
            isForgotClicked: false,
            // showSentToken: false,
            email: '',
            newPass: '',
            hashedToken: '',
            token: '',
            route: null,
            singnIn: true,
            isFlipped: false,
            hideStdForm:true    
        
        }
    }

    
    changeForm = (flag) => {

       this.setState({ isFlipped: flag });
        if(flag){
            $('p.regBtn').removeClass('btnFormActive');
            $('p.signBtn').addClass('btnFormActive');
        }
        else{
            $('p.signBtn').removeClass('btnFormActive');
            $('p.regBtn').addClass('btnFormActive');
        }
    }

    asStdHandler=(e)=>{
        if(e.target.checked){
            this.setState({hideStdForm:false})
        }
        else{
            this.setState({hideStdForm:true})
        }
    }

    render() {
        return (
            <>
                <div className="reg-body ">


                    {/* <h1>Login & registration Form</h1>
                    <div className="reg-info"><a href="https://www.grandvincent-marion.fr" target="_blank"><p> Made with <i className="fa fa-heart"></i> by Marion Grandvincent </p></a>
                    </div> */}

                    <div className="reg-content">
                        <div className="reg-container">
                            {/* <img className="bg-img" src="https://mariongrandvincent.github.io/HTML-Personal-website/img-codePen/bg.jpg" alt="" /> */}
                            <div className="reg-menu">
                                <p onClick={()=>{this.changeForm(false)}} className="  regBtn pointer flipperBtn btnFormActive ">SIGN IN</p>
                                <p onClick={()=>{this.changeForm(true)}} className=" signBtn pointer  flipperBtn ">SIGN UP</p>
                            </div>
                            <div className="my-line"></div>

                            <ReactCardFlip className="flipCard" isFlipped={this.state.isFlipped} flipDirection="horizontal">


                                <div className="connexion">


                                    <Login/>
                                </div>

                                <div className="enregistrer active-section">
                                    <div className="contact-form">
                                        <div className="reg-check reg-as">
                                            <label className="reg-as">
                                                <input id="checkAs" type="checkbox" className=" checkbox" onChange={this.asStdHandler} />
                                                <svg className='pointer'  xmlns="http://www.w3.org/2000/svg" width="26px" height="23px">
                                                    <path className="path-back" d="M1.5,6.021V2.451C1.5,2.009,1.646,1.5,2.3,1.5h18.4c0.442,0,0.8,0.358,0.8,0.801v18.398c0,0.442-0.357,0.801-0.8,0.801H2.3c-0.442,0-0.8-0.358-0.8-0.801V6" />
                                                    <path className="path-moving" d="M24.192,3.813L11.818,16.188L1.5,6.021V2.451C1.5,2.009,1.646,1.5,2.3,1.5h18.4c0.442,0,0.8,0.358,0.8,0.801v18.398c0,0.442-0.357,0.801-0.8,0.801H2.3c-0.442,0-0.8-0.358-0.8-0.801V6" />
                                                </svg>
                                            </label>
                                            <label className="forAs pointer" htmlFor="checkAs" >Register As Student</label>
                                        </div>
                                            <div  className="my-line"></div>

                                            {this.state.hideStdForm && <TeacherRegister hidden />}
                                            { ! this.state.hideStdForm && <StudentRegister /> }

                                    </div>
                                </div>
                            </ReactCardFlip>

                        </div>

                    </div>
                </div>

            </>
        );
    }
}
export default Registration;



// let pattern = /^\d*[A-Za-z]+\w*@zu.edu.jo$/ig ;
// let email = 'mohammad@zu.edu.jo';
// pattern.test(email);  //true

