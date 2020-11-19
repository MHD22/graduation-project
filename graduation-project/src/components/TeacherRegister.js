import React, { Component } from 'react' ;

class TeacherRegister extends Component{
    constructor(){
        super();
        this.state={
            firstName : '',
            lastName : '',
            id_number: '',
            password:'',
        }
    }
    // 
    newTeacher=(e)=> { // triggers when select images
        e.preventDefault();
        let formTeacher = document.getElementById('formTeacher');
        let firstName= formTeacher.fname.value;
        let lastName= formTeacher.lname.value;
        let password= formTeacher.tpassword.value;
        let id_number= formTeacher.t_id.value;
        if(firstName && lastName && password && id_number){
            this.setState({firstName, lastName,password,id_number}, ()=>{
                console.log(this.state)
                this.sendData() ;
            });
    }
}

    //
    sendData=() => {
        
        fetch('http://localhost:3000/teachers',{
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify(this.state),
        }).then(res => res.json()).then(console.log).catch("error during send student data to backend");
        
        
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