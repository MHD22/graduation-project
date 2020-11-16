import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import './CreateClass.css';

class CreateClass extends Component {
    constructor() {
        super();
        this.state = {
            isClickedNext: false,
            image: null,
            url: '',
            students:[],
            search:'' ,
            addedStd : [] ,
            courseName : ''
        }
    }

    //for hide class name input and show the add new student and done 
    next = (e) => {
        this.setState({ isClickedNext: true});
    }

    componentDidMount() {
        fetch('http://localhost:3000/students')
        .then(res=> res.json()).then(data=>{
            this.setState({students:data} , ()=>{console.log(this.state.students)});
        })
        .catch(e=>console.log(e));
    }

    handleFilter=(event)=>{
        this.setState({search:event.target.value});
        console.log(this.state.search);
    }

    //Add the select student to the state .
    addStudent = (e) => {
        let id = e.target.value ;
        let arr = this.state.addedStd;
        let found = arr.indexOf(id) ;
        if(found === -1){
            arr.push(id) ;
            // document.getElementById(id + 'label').style.background = "#004d1a";
            this.setState({
                addedStd : arr
            }) ;
        }
        else {
            arr.splice(found, 1);
            this.setState({addStudent: arr});
            
            document.getElementById(id + 'label').style.background = "#343a40";
        }
        console.log(this.state.addedStd) ;
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
        fetch('http://localhost:3000/classes',{
           method: 'POST',
           headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(this.state.addedStd),
       }).then(res => res.json()).then(console.log).catch("error during send student data to backend");
       
    }

    render() {
        const { isClickedNext } = this.state;
        let filteredArray = this.state.students.filter( (std)=>{
            return (std.name + std.id).includes(this.state.search);
        });
        if (this.state.addedStd.length !== 0){
        this.state.addedStd.map((id) => {
            let name = document.getElementById(id + 'label') ;
            if(name !== null){
            name.style.background = "#004d1a";
            }
            return <></>
        })
    }
        filteredArray = filteredArray.map((std , i)=>{
        return <label htmlFor={std.id} id={std.id + 'label'} key={std.id} className="student">{std.fname + ' ' + std.lname + ' | ' + std.id} <input type="checkbox" value={std.id} id={std.id} onChange={this.addStudent} className="check"/></label>
    })
      
        return (
            <>
                <div className="mt-3 bg-black-10 shadow-5 p-5 ">
                    {isClickedNext === false ? 
                    <>
                        <h1 className="main-title">Add Class</h1>
                        <input type="text" placeholder="Class Name" onChange={this.courseName} className="form-input mt-4" />
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
                </div>
            </>);
    }
}

export default CreateClass;



