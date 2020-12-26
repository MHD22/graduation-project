import React, { Component } from 'react' ;

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
            console.log(res)
        })
        .catch("error during send Teacher data to backend");
        
        
    }; 
    render(){
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
            </>
        );}
}
export default TeacherRegister ;