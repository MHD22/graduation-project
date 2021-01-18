import React from 'react';
import { Component } from 'react';
import { Col, Row } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import AddStudents from './AddStudents';
import Swal from 'sweetalert2'

class EditClass extends Component {
    constructor(){
        super();
        this.state={
            rows:[],
            clickedAdd:false,
            isThereChanges:false,
            students:[],
            lastStateOfStudents:[],
            route:null
        }
    }

    componentDidMount(){
        let students =[].concat(this.props.classInfo.students);
        this.renderTable(students);
        this.setState({students});
    }
    
    renderTable=(students)=>{
        let rows = students.map((std) => {
            return (
                <tr id={`r${std.id}`} key={std.id}>
                    <td>{std.id}</td>
                    <td>{std.name}</td>
                    <td><button onClick={() => this.deleteStd(std.id)}>X</button></td>
                </tr>
            )
        });
        this.setState({rows});
    }

    deleteStd=(id)=> {
        Swal.fire({
            title: 'Are you sure?',
            text: 'User will have Admin Privileges',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33', 
            confirmButtonText: 'Yes!'
        })
        .then((result) => {
            if (result.value) {
                let changedList =[].concat(this.state.lastStateOfStudents);
                let lastStateOfStudents = changedList.length? changedList : [].concat(this.state.students); 
                lastStateOfStudents = lastStateOfStudents.filter(std => {
                    return std.id !== id;
                })
                let rows = this.state.rows;
                rows = rows.filter(std => std.key !== id);
                this.setState({
                    rows,
                    isThereChanges:true,
                    lastStateOfStudents
                });
            }
        })
    }

    addStd=(arr)=>{
        let changedList =[].concat(this.state.lastStateOfStudents);
        let lastStateOfStudents = changedList.length? changedList : [].concat(this.state.students); 
        let idsOfCurrentStudents = lastStateOfStudents.map(obj=>obj.id).join(' ');
        let isThereChanges = this.state.isThereChanges;
        arr.forEach(std => {
            if( ! idsOfCurrentStudents.includes(std.id)){
                lastStateOfStudents.push(std);
                this.renderTable(lastStateOfStudents);
                isThereChanges=true;
            }
        });
        this.setState({
            clickedAdd:false,
            isThereChanges,
            lastStateOfStudents
        });
    }

    onAddStd=()=>{
        this.setState({clickedAdd:true});
    }

    onDeleteClass=()=>{
        Swal.fire({
            title: 'Are you sure?',
            text: 'User will have Admin Privileges',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33', 
            confirmButtonText: 'Yes!'
        })
        .then((result) => {
            if(result.value){
                let classData={
                    className:this.props.classInfo.className
                }
                let url='http://localhost:3000/deleteClass';
                let requestOptions={
                    method: 'DELETE',
                    headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(classData),
                }
                fetch(url, requestOptions)
                .then(res=>res.json())
                .then(console.log)
                .catch(e=>{console.log("error on Delete class request..",e)});
                this.setState({route:'/'});
            }
        })
    }

    onConfirm=()=>{
        Swal.fire({
            title: 'Are you sure?',
            text: 'User will have Admin Privileges',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33', 
            confirmButtonText: 'Yes!'
        })
        .then((result) => {
            if(result.value){
                let classData={
                    className:this.props.classInfo.className,
                    students : this.state.lastStateOfStudents
                }
                let url='http://localhost:3000/editClass';
                let requestOptions={
                    method: 'PUT',
                    headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(classData),
                }
                fetch(url, requestOptions)
                .then(res=>res.json())
                .then(console.log)
                .catch(e=>{console.log("error on edit class request..",e)});

                this.setState({
                    isThereChanges:false,
                    lastStateOfStudents:[],
                    route:'/'
                });
            }
        })
    }

    onCancel=()=>{
        this.renderTable(this.state.students);
        this.setState({
        isThereChanges:false,
        lastStateOfStudents:[]
    });
    }

    back = () => {
        this.setState({
            route:'/show'
        });
    }

    render(){
        let {rows} = this.state;
        return (
            <>
                {this.state.route? <Redirect to={this.state.route}/> : null}
                <img className="mt-2 grow pointer" onClick={this.back} src="https://img.icons8.com/fluent/48/000000/circled-left.png" alt="go back" />
                <h2 className="f2 mt4 ">{this.props.classInfo.className}</h2>
                <>
                    <table className="table table-bordered mt5" style={{ width: '100%' }}>
                        <thead className="text-dark" style={{ fontFamily: 'Lobster', letterSpacing: '2px' }}>
                            <tr>
                                <th>Student ID</th>
                                <th>Student Name</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody id='body' style={{ fontFamily: 'Acme', color: 'gray' }}>
                            {rows}
                        </tbody>
                    </table>
                </>

                { ! this.state.clickedAdd && (<button className="btn f3 grow btn-warning br4 shadow" onClick={this.onAddStd}>Add Students</button>)}
                {   this.state.clickedAdd && (<AddStudents createNew={false} onAddStd={this.addStd} />)}
               
                { this.state.isThereChanges && (
                    <Row className="mv5 justify-content-center"  xs={1} md={2}>
                        <Col xs={12}  md={3}><button className="ma2 btn f3 grow btn-success br4 shadow" onClick={this.onConfirm}>Confirm Changes</button></Col>
                        <Col xs={12}  md={3}><button className="ma2 btn f3 grow btn-danger  br4 shadow " onClick={this.onCancel}>Cancel </button></Col>
                    </Row>
                )}
                <Row className="ma3 justify-content-start"  >
                    <Col className="pa0 justify-start flex" xs={12} md={12}><button onClick={this.onDeleteClass} className="ma2 btn f5 grow btn-danger  br4 shadow">Delete Class !</button></Col>
                </Row>
            </>
        )
    }

}
export default EditClass;