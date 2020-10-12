import React, { Component, useState } from 'react';
import { Button } from 'react-bootstrap';

class CreateClass extends Component {
    constructor() {
        super();
        this.state = {
            isClickedNext: false,
        }
    }


    next = () => {
        this.setState({ isClickedNext: true });
    }

    listPerson=()=>{
        // const proxi = 'https://cors-anywhere.herokuapp.com/';
        const url = 'https://api.luxand.cloud/subject'
        // const fullUrl = proxi + url;
        fetch(url, {
            "async": true,
            "crossDomain": true,
            'method': 'GET',
            'headers': {
                "token": "0ed0d51e90cc4f3ab510a564cfb94b60"
            },
            "data": {}
        }).then(res => res.json())
            .then(console.log)
            .catch(err => console.log('error fetch'));
    }
    componentDidMount() {
        this.listPerson();

    }
    render() {
        const { isClickedNext } = this.state;
        return (
            <>

                <div className="mt-3 bg-black-10 shadow-5 p-5 ">
                    {isClickedNext === false ? <>
                        <h1 className="main-title">Add Class</h1>
                        <input type="text" placeholder="Class Name" className="form-input mt-4" />
                        <br />
                        <Button onClick={this.next} id='submit' className="btn f3 grow btn-success btn-submit mt-4" >Next</Button>
                    </>
                        :
                        <>
                            <h1 className="main-title">Add Student</h1>
                            <input type="text" placeholder="Student Name" className="form-input mt-4" />
                            <br />
                            <input type="file" id="file" placeholder="Student Major .." className="form-file mt-4" />
                            <br />
                            <Button id='submit' className="btn f3 grow btn-danger btn-submit mt-4" >Add Student</Button>
                            <Button id='submit' className="btn f3 grow btn-success btn-submit mt-4" >Done</Button><br />
                        </>}

                </div>
            </>);
    }
}

export default CreateClass;



