import React from 'react';
import { Component } from 'react';
import { Col, Row } from 'react-bootstrap';
import AddStudents from './AddStudents';
import Swal from 'sweetalert2'
import './CreateClass.css';
import './table.css';
import './myClasses.css';

class EditClass extends Component {
    constructor() {
        super();
        this.state = {
            rows: [],
            clickedAdd: false,
            isThereChanges: false,
            students: [],
            lastStateOfStudents: [],
        }
    }

    componentDidMount() {
        let students = [].concat(this.props.classInfo.students);
        this.renderTable(students);
        this.setState({ students });
    }

    renderTable = (students) => {
        let rows = students.map((std) => {
            return (
                <tr id={`r${std.id}`} key={std.id}>
                    <td>{std.id}</td>
                    <td>{std.name}</td>
                    <td onClick={() => this.deleteStd(std.id)}><img className="icon" src="https://img.icons8.com/flat_round/64/000000/minus.png" alt="delete"/></td>
                </tr>
            )
        });
        this.setState({ rows });
    }

    deleteStd = (id) => {
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: 'btn btn-success',
                cancelButton: 'btn btn-danger'
            },
            buttonsStyling: false
        })

        swalWithBootstrapButtons.fire({
            title: 'Are you sure?',
            text: "You want to delete this student",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, cancel!',
            reverseButtons: true
        }).then((result) => {
            if (result.isConfirmed) {
                let changedList = [].concat(this.state.lastStateOfStudents);
                let lastStateOfStudents = changedList.length ? changedList : [].concat(this.state.students);
                lastStateOfStudents = lastStateOfStudents.filter(std => {
                    return std.id !== id;
                })
                let rows = this.state.rows;
                rows = rows.filter(std => std.key !== id);
                this.setState({
                    rows,
                    isThereChanges: true,
                    lastStateOfStudents
                });
                swalWithBootstrapButtons.fire(
                    'Deleted!',
                    'Student has been deleted.',
                    'success'
                )
            } else if (
                result.dismiss === Swal.DismissReason.cancel
            ) {
                swalWithBootstrapButtons.fire(
                    'Cancelled',
                    'No changes done',
                    'error'
                )
            }
        })

    }

    addStd = (arr) => {
        let changedList = [].concat(this.state.lastStateOfStudents);
        let lastStateOfStudents = changedList.length ? changedList : [].concat(this.state.students);
        let idsOfCurrentStudents = lastStateOfStudents.map(obj => obj.id).join(' ');
        let isThereChanges = this.state.isThereChanges;
        arr.forEach(std => {
            if (!idsOfCurrentStudents.includes(std.id)) {
                lastStateOfStudents.push(std);
                this.renderTable(lastStateOfStudents);
                isThereChanges = true;
            }
        });
        this.setState({
            clickedAdd: false,
            isThereChanges,
            lastStateOfStudents
        });
    }

    onAddStd = () => {
        this.setState({ clickedAdd: true });
    }

    onDeleteClass = () => {
        Swal.fire({
            title: 'Are you sure?',
            html: "<h5 class='text-danger'>You won't to delete this class !</h5>",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                let classData = {
                    className: this.props.classInfo.className
                }
                let baseUrl = document.getElementById('baseUrl').defaultValue;
                let url = `${baseUrl}/deleteClass`;
                let requestOptions = {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(classData),
                }
                fetch(url, requestOptions)
                    .then(res => res.json())
                    .then(console.log)
                    .catch(e => { console.log("error on Delete class request..", e) });
                this.props.onChangeRoute('/show', 500);
                Swal.fire(
                    'Deleted!',
                    'Class has been deleted.',
                    'success'
                )
            }
        })
    }

    onConfirm = () => {
        Swal.fire({
            title: 'Do you want to save the changes?',
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: `Save`,
            denyButtonText: `Don't save`,
            icon: 'info'
        }).then((result) => {
            if (result.isConfirmed) {
                let classData = {
                    className: this.props.classInfo.className,
                    students: this.state.lastStateOfStudents
                }
                let baseUrl = document.getElementById('baseUrl').defaultValue;
                let url = `${baseUrl}/editClass`;
                let requestOptions = {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(classData),
                }
                fetch(url, requestOptions)
                    .then(res => res.json())
                    .then(console.log)
                    .catch(e => { console.log("error on edit class request..", e) });

                this.setState({
                    isThereChanges: false,
                    lastStateOfStudents: [],
                });
                this.props.onChangeRoute('/show', 500);
                Swal.fire('Saved!', '', 'success')
            } else if (result.isDenied) {
                this.onCancel();
                Swal.fire('Changes are not saved', '', 'info')
            }
        })
    }

    onCancel = () => {
        this.renderTable(this.state.students);
        this.setState({
            isThereChanges: false,
            lastStateOfStudents: []
        });
    }

    back = () => {
        this.setState({
        });
        this.props.onChangeRoute('/show/classData', 0);
    }

    render() {
        let { rows } = this.state;
        return (
            <div className="edit-class">
                <button hover-data="Back"
                    onClick={this.back} className="red-btn my-button">
                    <i className="btn-icon far fa-arrow-alt-circle-left"></i>
                </button>
                <h2 className="f2 mt2 font-lobster">{this.props.classInfo.className}</h2>
                <>
                    <table id="table1" className="" style={{ width: '100%' }}>
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

                { !this.state.clickedAdd && (<button className="my-button grow mt-2" onClick={this.onAddStd}>Add Students</button>)}
                {   this.state.clickedAdd && (<AddStudents createNew={false} onAddStd={this.addStd} />)}

                { this.state.isThereChanges && (
                    <Row className="d-flex justify-content-center" xs={1} md={2}>
                        <Col xs={12} md={6}><button className="my-button grn-btn grow" onClick={this.onConfirm}>Confirm Changes</button></Col>
                        <Col xs={12} md={6}><button className="my-button grow red-btn" onClick={this.onCancel}>Cancel </button></Col>
                    </Row>
                )}
                <Row className="ma3 justify-content-start"  >
                    <Col className="pa0 justify-start flex" xs={12} md={12}><button onClick={this.onDeleteClass} className="my-button grow red-btn">Delete Class !</button></Col>
                </Row>
            </div>
        )
    }

}
export default EditClass;