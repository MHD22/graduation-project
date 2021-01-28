import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Swal from 'sweetalert2' ;
import './CreateClass.css'

class AddStudents extends Component {
    constructor() {
        super();
        this.state = {
            students: [],
            addedStdID: [],
            addedStdFName: [],
            addedStdLName: [],
            search: '',
            show: false,
            title: '',
            body: '',
            route: null,
            courseName: ''
        }
    }
    componentDidMount() {
        let baseUrl= document.getElementById('baseUrl').defaultValue;
        let url = `${baseUrl}/students`;
        fetch(url)
            .then(response => response.json())
            .then(data => {
                this.setState({ students: data });
            })

        console.log(this.state)
    }

    opensweetalert = () => {
        Swal.fire({
        title: 'Success',
        html: '<h5 class="text-success">Class Created Successfully !</h5>',
        type: 'success',
        icon: 'success'
        })
        this.done() ;
    }

    addNewClass = (e) => {
        let teacherID = JSON.parse(sessionStorage.getItem('teacher')).id_number;
        let classData = {
            teacherID,
            className: this.props.courseName,
            ids: this.state.addedStdID,
            fnames: this.state.addedStdFName,
            lnames: this.state.addedStdLName
        };
        let baseUrl= document.getElementById('baseUrl').defaultValue;
        fetch(`${baseUrl}/classes`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(classData),
        })
            .then(res => res.json())
            .then(console.log)
            .then(
                this.opensweetalert() 
            )
            .catch(
                e => { console.log(e) }
            );
    }

    addStudent = (e) => {
        console.log("aaaa")
        let id = e.target.value;
        let fname = e.target.getAttribute('data-fname');
        let lname = e.target.getAttribute('data-lname');
        let arrIDS = this.state.addedStdID;
        let arrFN = this.state.addedStdFName;
        let arrLN = this.state.addedStdLName;
        let found = arrIDS.indexOf(id);
        if (found === -1) {
            arrIDS.push(id);
            arrFN.push(fname);
            arrLN.push(lname);

            this.setState({
                addedStdID: arrIDS,
                addedStdFName: arrFN,
                addedStdLName: arrLN,
            });
        }
        else {
            arrIDS.splice(found, 1);
            arrFN.splice(found, 1);
            arrLN.splice(found, 1);
            this.setState({
                addedStdID: arrIDS,
                addedStdFName: arrFN,
                addedStdLName: arrLN
            });

            document.getElementById(id + 'label').style.background = "#343a40";
        }
        console.log(this.state.addedStdID, this.state.addedStdFName, this.state.addedStdLName);
    }

    handleFilter = (event) => {
        this.setState({ search: event.target.value });
    }
    editStudents = () => {
        console.log("added..")
        let { addedStdID, addedStdFName, addedStdLName } = this.state;
        let editArray = addedStdID.map((std, ind) => {
            return { id: std, name: `${addedStdFName[ind]} ${addedStdLName[ind]}` };
        })
        this.props.onAddStd(editArray);
    }

    handleClose = (e) => {
        this.setState({
            show: false
        });
    }

    done = (e) => {
        this.setState({
            route: '/show'
        });
    }

    render() {

        let filteredArray = this.state.students.filter((std) => {
            return (`${std.fname} ${std.lname} ${std.id}`).toLowerCase().includes(this.state.search.toLowerCase());
        });
        if (this.state.addedStdID.length !== 0) {

            this.state.addedStdID.forEach((id) => {
                let name = document.getElementById(id + 'label');
                if (name !== null) {
                    name.style.background = "#004d1a";
                }

            })
        }
        filteredArray = filteredArray.map((std, i) => {
            return <label htmlFor={std.id} id={std.id + 'label'} key={std.id} data-name={std.fname} className="student">{std.fname + ' ' + std.lname + ' | ' + std.id} <input type="checkbox" data-fname={std.fname} data-lname={std.lname} value={std.id} id={std.id} onChange={this.addStudent} className="check" /></label>
        })



        return (
            <>
                {this.state.route ? <Redirect to={this.state.route} /> : null}
                <h1 className="main-title">Add Students</h1>
                <div className="container-students">
                <input className="search" onChange={this.handleFilter} type="search" placeholder='search on students' />
                    <div className="cont-cont">
                        <div className="students p-3" id="students">
                            {filteredArray}
                        </div>
                    </div>
                </div>
                <br />
                <button id='submit' className="btn f3 grow btn-success btn-submit"
                    onClick={
                        this.props.createNew ?
                            this.addNewClass
                            :
                            this.editStudents
                    }>Done</button><br />
            </>
        )
    }
}
export default AddStudents;