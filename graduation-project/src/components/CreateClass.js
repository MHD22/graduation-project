import React, { Component } from 'react';
import { Button , Modal } from 'react-bootstrap';
import './CreateClass.css';
import { Redirect } from "react-router-dom";

class CreateClass extends Component {
    constructor() {
        super();
        this.state = {
            isClickedNext: false,
            image: null,
            url: '',
            students:[],
            search:'' ,
            addedStdID : [] ,
            addedStdFName : [] ,
            addedStdLName : [] ,
            courseName : '' ,
            hidePage : true ,
            show : false ,
            title : '' ,
            body : '' ,
            redirect : false
        }
    }

    //To Check if LoggedIn .
    checkLoggedIn = () => {
        const data = sessionStorage.getItem('teacher') ;
        if(!data){
            window.location.replace('http://localhost:3001/login') ;
        }
        else {
            this.setState({
                hidePage : false
            })
        }
    }

    //for hide class name input and show the add new student and done 
    next = (e) => {
        this.setState({ isClickedNext: true});
    }

    componentDidMount() {
        this.checkLoggedIn();
        fetch('http://localhost:3000/students')
        .then(res=> res.json()).then(data=>{
            this.setState({students:data} , ()=>{console.log(this.state.students)});
        })
        .catch(e=>console.log(e));
    }

    handleFilter=(event)=>{
        this.setState({search:event.target.value});
    }

    //Add the select student to the state .
    addStudent = (e) => {
        let id = e.target.value ;
        let fname = e.target.getAttribute('data-fname') ;
        let lname = e.target.getAttribute('data-lname') ;
        let arrIDS= this.state.addedStdID;
        let arrFN= this.state.addedStdFName ;
        let arrLN = this.state.addedStdLName ;
        let found = arrIDS.indexOf(id) ;
        if(found === -1){
            arrIDS.push(id) ;
            arrFN.push(fname) ;
            arrLN.push(lname) ;
            // document.getElementById(id + 'label').style.background = "#004d1a";
            this.setState({
                addedStdID : arrIDS,
                addedStdFName : arrFN,
                addedStdLName : arrLN ,
            }) ;
        }
        else {
            arrIDS.splice(found, 1);
            arrFN.splice(found, 1);
            arrLN.splice(found, 1);
            this.setState({addStudent: arrIDS, addedStdFName : arrFN, addedStdLName : arrLN});
            
            document.getElementById(id + 'label').style.background = "#343a40";
        }
        console.log(this.state.addedStdID , this.state.addedStdFName , this.state.addedStdLName) ;
    }

    courseName = (e) => {
        let cName = e.target.value ;
        console.log(cName) ;
        this.setState({
            courseName : cName
        })
    }

    //Sende the students ids to the backend
    addNewClass = (e) => {
        let teacherID = JSON.parse(sessionStorage.getItem('teacher')).id_number;
        let classData = {
            teacherID,
            className:this.state.courseName,
            ids:this.state.addedStdID ,
            fnames : this.state.addedStdFName ,
            lnames : this.state.addedStdLName };

        fetch('http://localhost:3000/classes',{
           method: 'POST',
           headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(classData),
        })
        .then(res => res.json())
        .then(
            this.setState({
            title : 'Done' ,
            body : 'Class Created Successfully ..' ,
            show : true
        })
       ).catch(e=>{console.log(e)});   
    }

    handleClose = (e) => {
        this.setState({
            show : false 
        });
    }

    done = (e) => {
        this.setState({
            redirect : true
        });
    }

    render() {

        if(this.state.redirect){
            return <Redirect to='/show'/>;
        }

        const { isClickedNext } = this.state;
        let filteredArray = this.state.students.filter( (std)=>{
            return (`${std.fname} ${std.lname} ${std.id}`).toLowerCase().includes(this.state.search.toLowerCase());
        });
        if (this.state.addedStdID.length !== 0){
        
        this.state.addedStdID.forEach((id) => {
            let name = document.getElementById(id + 'label') ;
            if(name !== null){
            name.style.background = "#004d1a";
            }
            
        })
    }
        filteredArray = filteredArray.map((std , i)=>{
        return <label htmlFor={std.id} id={std.id + 'label'} key={std.id} data-name={std.fname} className="student">{std.fname + ' ' + std.lname + ' | ' + std.id} <input type="checkbox" data-fname={std.fname} data-lname={std.lname} value={std.id} id={std.id} onChange={this.addStudent} className="check"/></label>
    })
      
        return (
            <>
                <div hidden={this.state.hidePage} className="mt-3 bg-black-10 shadow-5 p-5 ">
                    {isClickedNext === false ? 
                    <>
                        <h1 className="main-title">Add Class</h1>
                        <input type="text" placeholder="Class Name" onChange={this.courseName} className="form-input mt-4" required />
                        <br />
                        <Button onClick={this.next} id='submit' className="btn f3 grow btn-success btn-submit mt-4">Next</Button>
                    </>
                        :
                    <>
                            <h1 className="main-title">Add Student</h1>
                            <div className= "container-students">
                                <input className="search" onChange={this.handleFilter} type="search" placeholder="search on students"/>
                                <div className="cont-cont">
                                    <div className="students p-3" id="students">
                                            {filteredArray}
                                    </div>
                                </div>
                            </div>
                            <br />
                            <Button id='submit' className="btn f3 grow btn-success btn-submit" onClick={this.addNewClass}>Done</Button><br />
                    </>}
                    <Modal
                        show={this.state.show}
                        onHide={this.handleClose}
                        backdrop="static"
                        keyboard={false}
                        size = "lg"
                        centered
                    >

                        <Modal.Title className="text-info text-center p-5 font-lobster">{this.state.title}</Modal.Title>
                        <Modal.Body className="text-center  font-acme">{this.state.body}</Modal.Body>
                        <Modal.Footer>
                        <Button variant="primary" className="text-center grow" onClick={this.done}>Done</Button>
                        </Modal.Footer>
                    </Modal>
                </div>
            </>);
    }
}

export default CreateClass;



