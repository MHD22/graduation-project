import React, { Component } from 'react';
import { Button } from 'react-bootstrap';

class CreateClass extends Component {
    constructor() {
        super();
        this.state = {
            isClickedNext: false,
            image: null,
            url: ''
        }
    }

    //for hide class name input and show the add new student and done 
    next = () => {
        this.setState({ isClickedNext: true });
    }


    listPerson = () => {
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
            .then(console.log)          // display names all persons.. 
            .catch(err => console.log('error fetch'));
    }



    componentDidMount() {
        this.listPerson();
    }



    setImage = (e) => { // triggers when select images
        const file=e.target;
        if (file.files.length === 3) {
            this.createPerson(file); //create the first image and add to it the 2 other images 
        }
    }



    //add faces to exist person
    addFace = (file,id) => {
        var myHeaders = new Headers();
        myHeaders.append("token", "0ed0d51e90cc4f3ab510a564cfb94b60");

        var formdata = new FormData();
        formdata.append("photo", file, "file");

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: formdata,
            redirect: 'follow'
        };

        fetch(`https://api.luxand.cloud/subject/${id}`, requestOptions) // id of the person ..
            .then(response => response.json())
            .then(result => console.log(result))
            .catch(error => console.log('error add face fetch', error));
    }

    //create new person
    createPerson(file) {
        // check if the name is exist or not ?
        let stName=document.getElementById('stName').value; 
        

        if(stName){ //check the name in database.


        
        var myHeaders = new Headers();
        myHeaders.append("token", '0ed0d51e90cc4f3ab510a564cfb94b60');

        var formdata = new FormData();
        formdata.append("name", stName);
        formdata.append("photo", file.files[0], "file");//first image
        formdata.append("store", "1");

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: formdata,
            redirect: 'follow'
        };

        fetch("https://api.luxand.cloud/subject/v2", requestOptions)
            .then(response => response.json())
            .then(result => {
                let id = result.id; // get the id for add faces to the same person.
                this.addFace(file.files[1],id); //add second and third images to the same person
                this.addFace(file.files[2],id);//add second and third images to the same person
                console.log(result)
                //alert .. added successfully
            })
            .catch(error => console.log('error fetching', error));
        }
    }


    render() {
        const { isClickedNext } = this.state;
        return (
            <>

                <div className="mt-3 bg-black-10 shadow-5 p-5 ">
                    {isClickedNext === false ? 
                    <>
                        <h1 className="main-title">Add Class</h1>
                        <input type="text" placeholder="Class Name" className="form-input mt-4" />
                        <br />
                        <Button onClick={this.next} id='submit' className="btn f3 grow btn-success btn-submit mt-4" >Next</Button>
                    </>
                        :
                    <>
                            <h1 className="main-title">Add Student</h1>
                            <input id ='stName' type="text" placeholder="Student Name" className="form-input mt-4" />
                            <br />
                            <input type="file" onChange={this.setImage} multiple accept="image/*" id="file2" placeholder="Student Major .." className="form-file mt-4" required />
                            <br />

                            <Button id='submit' onClick={this.listPerson} className="btn f3 grow btn-danger btn-submit mt-4" >Add Student</Button>
                            <Button id='submit' className="btn f3 grow btn-success btn-submit mt-4" >Done</Button><br />
                    </>}

                </div>
            </>);
    }
}

export default CreateClass;



