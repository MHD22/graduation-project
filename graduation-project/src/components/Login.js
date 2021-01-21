import React from 'react' ;
import { Component } from 'react';
import { Redirect } from 'react-router-dom';

class Login extends Component{
    constructor(){
        super();
        this.state = {
            isForgotClicked: false,
            showSentToken: false,
            email:'',
            newPass:'',
            hashedToken:'',
            token:'',
            route:null
        }
    }

    checkId=(event)=>{

        event.preventDefault();
        const form = document.getElementById('signInForm');
        let user= {id: form.teacherId.value , password:form.teacherPassword.value };

          checkTheUserData(user)
          .then(userData=>{

            if(isUserLoggedIn(userData)){
                storedUserInSession(userData);
                goToHomePage();   
            }
            else{
                alert("ID OR Password is wrong! \n try again..")
            }

        })
        .catch(e=>{console.log("error during send user data to backend within the sign in page.")});    
    }

    resetPassHandler = (e)=>{
        e.preventDefault();
        let token = document.getElementById('resetToken').value;
        let {email, newPass, hashedToken} = this.state;
        let bodyData={email, newPass, token, hashedToken};
        let url ="http://localhost:3000/resetPass";
        let requestOptions = 
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(bodyData),
        };
        fetch(url,requestOptions)
        .then(res=>res.json())
        .then(response=>{
            if(response === 'done'){
                alert("Password Is Changed Successfully");
                this.setState({isForgotClicked:false});
                this.clearForms();
            }
            else if(response === 'Token is wrong.'){
                alert(`${response}, try again..`);
            }

            console.log(response);
        })
        
    }

    showResetForm = ()=>{
        this.setState({isForgotClicked:true});
    }

    getAccessToken=(e)=>{
        e.preventDefault();
        let resetForm = document.getElementById('resetPassForm');
        let email = resetForm.email.value;
        let newPass = resetForm.newPass.value;
        this.setState({email,newPass});
        let url ="http://localhost:3000/sendToken";
        let requestOptions = 
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email }),
        };
        fetch(url,requestOptions)
        .then(result=>result.json())
        .then(response=>{
            if(response === 'This email is not registered yet.'){
                alert(response);
            }
            else if(response === 'error within checking the teacher existance'){
                alert('Something wrong, try again later, please.')
            }
            else {
                this.setState({hashedToken:response, showSentToken:true});
            }
        })
        .catch(e=>{console.log("error when getting the hashed token..")});
        
    }
    clearForms=()=>{
       let form = document.getElementById('signInForm');
       form.teacherId.value='';
       form.teacherPassword.value='';

    }

    render() {
        return(
            <>
            <div hidden={this.state.isForgotClicked}>
                <h1 className="main-title">Login Page</h1>
                <form className="mt-3" id='signInForm' >
                    <input name='teacherId' type="text" placeholder="Teacher ID .." className="form-input mt-4" required/>
                    <br/>
                    <input name='teacherPassword' type="password" placeholder="Password.." className="form-input mt-4" required/>
                    <br />
                    <input type="submit" id='submit' onClick={this.checkId} value="Login" className="btn btn-success btn-submit mt-4"/>
                </form>
                <p className="f6 b i red pointer underline ma3" onClick={this.showResetForm} >Forgot Password?</p>
            </div>
            <div hidden={! this.state.isForgotClicked}>
                <h2 className="main-title ma3" >Reset Password</h2>
                <form  className="mt-3" id='resetPassForm' >
                    <div hidden={this.state.showSentToken}>
                        <input name='email' type="email" placeholder="Email.." className="form-input mt-4" required/>
                        <br/>
                        <input name='newPass' type="password" placeholder="Your New Password" className="form-input mt-4" required/>
                        <br/>
                        <input type="submit"  onClick={this.getAccessToken} value="Send Token" className="btn btn-success btn-submit mt-4"/>
                    </div>
                    <div hidden={ ! this.state.showSentToken}>
                        <input name='token' id="resetToken" type="text" placeholder="Your Access Token.." className="form-input mt-4" required/>
                        <br/>
                        <input type="submit"  onClick={this.resetPassHandler} value="Done!" className="btn btn-success btn-submit mt-4"/>
                    </div>
                </form>
                
                
            </div>
            </>
        );
    }
}
export default Login



//helper functions:


function isUserLoggedIn (userData){
    if(userData.length===1){
        return true;
    }
    return false;
}

function storedUserInSession(userData){
    const {firstName,lastName,id_number} = userData[0];
    const storedData = {firstName,lastName,id_number};
    sessionStorage.setItem('teacher',JSON.stringify(storedData));
}

function goToHomePage(){
    window.location.replace("http://localhost:3001");
}

function checkTheUserData(user){
    return fetch('http://localhost:3000/loginTeacher',{
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
    })
    .then(res => res.json())

}