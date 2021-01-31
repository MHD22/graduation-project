import React, { Component } from 'react';
import './CreateClass.css';
import { Redirect } from "react-router-dom";
import AddStudents from './AddStudents';
import Swal from 'sweetalert2';
import './table.css';
import ReactCardFlip from 'react-card-flip';
import $ from 'jquery';
import '../styles/registration.css';

class CreateClass extends Component {
    constructor() {
        super();
        this.state = {
            isClickedNext: false,
            image: null,
            url: '',
            search: '',
            courseName: '',
            show: false,
            title: '',
            body: '',
            redirect: false,
            route: null,
            isFlipped: false,
        }
    }

    //To Check if LoggedIn .
    checkLoggedIn = () => {
        const data = sessionStorage.getItem('teacher');
        if (!data) {
            this.setState({ route: '/login' });
            return false;
        }
        else {
            return true;
        }
    }

    opensweetalertdanger = (msg) => {
        Swal.fire({
            icon: 'error',
            title: 'Oops ..! ',
            html: `<h5 class="text-danger">${msg}</h5>`,
        })
    }

    next = (e) => {
        if(! $('#newClass').val()){
            this.opensweetalertdanger("Class Name Can't Be Empty..!");
        }
        else{
            let baseUrl = document.getElementById('baseUrl').defaultValue;
            fetch(`${baseUrl}/checkClass/${this.state.courseName}`)
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    if (data) {
                        this.opensweetalertdanger("Class Name Is Already Exist..!");
                    }
                    else {
                        this.setState({ isFlipped: true });
                    }
                })
        }
    }

    componentDidMount() {
        if (this.checkLoggedIn()) {
            let baseUrl = document.getElementById('baseUrl').defaultValue;
            fetch(`${baseUrl}/students`)
                .then(res => res.json()).then(data => {
                    this.setState({ students: data }, () => { console.log(this.state.students) });
                })
                .catch(e => console.log(e));
        }
    }

    courseName = (e) => {
        let cName = e.target.value;
        console.log(cName);
        this.setState({
            courseName: cName
        })
    }

    render() {


        return (
            <>
                {this.state.route ? <Redirect to={this.state.route} /> : null}
                <div className="addC-body">
                    <div className="reg-content">
                        <div className="reg-container">


                            <ReactCardFlip className="flipCard" isFlipped={this.state.isFlipped} flipDirection="horizontal">
                                <>

                                    <label className="main-title add">Class Name</label>
                                    
                                    <input name="newClass" id="newClass" onChange={this.courseName} type="text" />
                                    
                                    <button className="mt4 my-button" onClick={this.next} >Next</button>
                                
                                </>

                                <AddStudents createNew={true} courseName={this.state.courseName} />

                                
                            </ReactCardFlip>

                        </div>

                    </div>
                </div>





            </>











        );
    }
}

export default CreateClass;



