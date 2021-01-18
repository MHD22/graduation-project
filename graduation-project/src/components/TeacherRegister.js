import React, { Component } from 'react' ;
import {Modal , Button} from 'react-bootstrap' ;
import { Redirect } from "react-router-dom";

class TeacherRegister extends Component{
    constructor(){
        super();
        this.state={
            verified: false,
            teacherData:{},
            hashedToken:'',
            route:null,
            
        }
    }
    newTeacher=(e)=> {
        e.preventDefault();
        let formTeacher = document.getElementById('formTeacher');
        let teacherData ={
        firstName : formTeacher.fname.value,
        lastName : formTeacher.lname.value,
        email    : formTeacher.email.value,
        password : formTeacher.tpassword.value,
        id_number : formTeacher.t_id.value,
        }
        this.setState({teacherData});

        // this.clearForm() ;
        
        if(teacherData.firstName && teacherData.lastName && teacherData.password && teacherData.id_number && teacherData.email){
                this.storeTeacherDataInDB(teacherData);    
        }
        else {
            alert("you should enter all the fields.");
        }
    }

    storeTeacherDataInDB=(teacherData) => {
        let {email , id_number }=teacherData;
        let bodyData = {email,id_number};
        fetch('http://localhost:3000/teachers',{
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify(bodyData),
        })
        .then(res => res.json())
        .then(res=>{
           
            if(res === 'Teacher Is Already Exist.'){
               // mazen 
               alert("teacher is exist");
            }
            else {
                let start = res.indexOf('token:'); //5
                if(start !== -1){
                    let hashedToken = res.slice(6);
                    this.setState({hashedToken,verified:true})
                    document.getElementsByClassName('registerAsButton')[0].style.display='none';
                    document.getElementsByClassName('registerAsButton')[1].style.display='none';

                }
                else{
                    // mazen : something wrong , try again, please.
                }
            }

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
    saveTeacher=(e)=>{
        e.preventDefault();
        let token = document.getElementById('token').value;
        if(token){
            let teacherData =Object.assign({},this.state.teacherData);
            let {hashedToken} = this.state;
            teacherData.hashedToken=hashedToken;
            teacherData.token=token;
            console.log(teacherData , " <= teacher data.  ");
            
            fetch('http://localhost:3000/teacherRegister',{
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify(teacherData),
        })
        .then(res => res.json())
        .then(res=>{
            if(res === 'Teacher Added Successfully'){

                // mazen added success 
                alert("hooooooo, mazen.");
                this.storedUserInSession(this.state.teacherData);
                this.goToHomePage();

            }
            else{
                // mazen  wrong token 
                alert("ooops, not mazen., token is wrong")
            }
        })
        .catch(e=>{console.log("error when storing teacher data with the tokens.",e)});
        }
    }
    storedUserInSession = (userData)=>{
        const {firstName,lastName,id_number} = userData;
        const storedData = {firstName,lastName,id_number};
        sessionStorage.setItem('teacher',JSON.stringify(storedData));
    }
    goToHomePage=()=>{
        window.location.replace("http://localhost:3001");
    }

    render(){

        if(this.state.redirect){
            return <Redirect to='/'/>;
        }

        return(
            <>
            <form id="formTeacher" hidden={this.state.verified}>
                <input type="text" id="fname" placeholder="First Name .." className="form-input mt-4" name="fname" required />
                <br />
                <input type="text" placeholder="Last Name .." className="form-input mt-4" id="lname" name="lname" required/>
                <br />
                <input type="email" placeholder="Email .." className="form-input mt-4" id="email" name="email" required/>
                <br />
                <input type="text" id="t_id" placeholder="Teacher ID .." className="form-input mt-4" name="t_id" required/>
                <br />
                <input type="password" placeholder="Password .." className="form-input mt-4" name="tpassword" id="tpassword" required/>
                <br /> 
                <button type="submit" className="btn btn-success btn-submit mt-4" onClick={this.newTeacher} >
                Register
                </button>
            </form>
            <form hidden={! this.state.verified} >
                <fieldset >
                    <legend>Verification</legend>
                    <label htmlFor="token">Enter your access token Which sent on your email:</label>
                    <br/>
                    <input type="text" id="token" placeholder="Access token" className="form-input mt-4" name="token" required />
                    <br/>
                    <input type="submit" className="btn btn-success btn-submit mt-4" onClick={this.saveTeacher} value="OK!"/>     
                </fieldset>
            </form>
            
            </>
        );}
}
export default TeacherRegister ;