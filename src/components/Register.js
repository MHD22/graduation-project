import React, { Component } from 'react' ;
import StudentRegister from './StudentRegister' ;
import TeacherRegister from './TeacherRegister';

class Register extends Component{
    constructor(){
        super();
        this.state={
            student : false ,
            teacher : false
        }
    }

    regStd = () => {
        this.setState({
            student : true ,
            teacher : false
        })
    }

    regTec = () => {
        this.setState({
            student : false ,
            teacher : true
        })
    }

    render(){

    
    return(
        <div>
        <h1 className="main-title">Register Page</h1>
        <br/>
        <div className="row text-center">
            <div className="col-md-12">
                <button className="registerAsButton btn btn-success mr-2 btn-submit grow" onClick={this.regStd}>Register As Student</button>
                <button className="registerAsButton btn btn-info ml-2 btn-submit grow" onClick={this.regTec}>Register As Teacher</button>
            </div>
        </div>
        <div hidden={!this.state.student}>
        <StudentRegister />
        </div>
        <div hidden={!this.state.teacher}>
        <TeacherRegister />
        </div>
        </div>
    );}
}
export default Register ;
