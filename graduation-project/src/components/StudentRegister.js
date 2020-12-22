import React, { Component } from 'react' ;

class StudentRegister extends Component{
    constructor(){
        super();
        this.state={
            firstName : '',
            lastName : '',
            id_number: '',
            faceID:'',
            password:'',
            images:[]

        }
    }
    //file.files.length === 3
    checkThreeImages(file) {
        if (file.files.length === 3){
            return true ;
        }
        return false;
        
    }
    setImage=(e)=> { 
        e.preventDefault();
        let formStudent = document.getElementById('formStudent');

        let firstName= formStudent.firstName.value;
        let lastName= formStudent.lastName.value;
        let password= formStudent.password.value;
        let id_number= formStudent.id_number.value;
        const file=document.getElementById("file");

        // var file_data = $("#Image").prop("files")[0];   
        // let file_data = file.files[0];
        // var fd = new FormData();

        // fd.append("file", file_data);
        // fd.append("isFirst", true);
        
        // console.table(file_data);




        
        if(firstName && lastName && password && id_number&& this.checkThreeImages(file) ){
            this.setState({firstName, lastName,password,id_number}, ()=>{console.log(this.state)});
            
        if (this.checkThreeImages(file)) {
            this.createPerson(file); //create the first image and add to it the 2 other images 
            }
        }
        else{
            alert("you should entere all the fields and three images ..");
        }
    }


    createPerson=(file)=>{
        // check if the name is exist or not ?
        

        let id_number=document.getElementById('id_number').value; // for check if the student is already registered.
        let stName = document.getElementById('firstName').value;
        let studentData = {id_number,stName,file: file.files};
        console.log(`student data :  `,studentData)
        fetch('http://localhost:3000/createPerson',{
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify(studentData),
        }).then(res => res.json())
        .then(images=>{
            this.setState({images:images});
            console.log(this.state);  
        })
        .catch(e=>{console.log("error while create the person..")});   //fffff
    }

    //     if(id_number){ //check the id in database.


        
    //     var myHeaders = new Headers();
    //     myHeaders.append("token", '0ed0d51e90cc4f3ab510a564cfb94b60');

    //     var formdata = new FormData();
    //     formdata.append("name", stName);
    //     formdata.append("photo", file.files[0], "file");
    //     formdata.append("store", "1");

    //     var requestOptions = {
    //         method: 'POST',
    //         headers: myHeaders,
    //         body: formdata,
    //         redirect: 'follow'
    //     };

    //     fetch("https://api.luxand.cloud/subject/v2", requestOptions)
    //         .then(response => response.json())
    //         .then(result => {
    //             let id = result.id; // get the id for add faces to the same person.
    //             this.setState({faceID:id , images: [result.url]});
    //             this.addFace(file.files[1],id); //add second and third images to the same person
    //             this.addFace(file.files[2],id);//add second and third images to the same person
    //             console.log(result , id);
    //             //alert .. added successfully
    //         })
    //         .catch(error => console.log('error fetching', error));
    //     }
    // }




    // //add faces to exist person
    // addFace=(file,id)=>{
    //     var myHeaders = new Headers();
    //     myHeaders.append("token", "0ed0d51e90cc4f3ab510a564cfb94b60");

    //     var formdata = new FormData();
    //     formdata.append("photo", file, "file");

    //     var requestOptions = {
    //         method: 'POST',
    //         headers: myHeaders,
    //         body: formdata,
    //         redirect: 'follow'
    //     };
        
    //     fetch(`https://api.luxand.cloud/subject/${id}`, requestOptions) // id of the person ..
    //         .then(response => response.json())
    //         .then(result => {
    //             let arr = this.state.images;
    //             arr.push(result.url);
                
    //             if(arr.length===3){
    //                 this.sendData();
    //             }  
    //         })
    //         .catch(error => console.log('error add face fetch', error));
    // }

    //create new person

    //
    sendData=() => {
        

        fetch('http://localhost:3000/students',{
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
            <form id="formStudent">
                <input type="text" id="firstName" placeholder="First Name .." className="form-input mt-4" name="firstName" required />
                <br />
                <input type="text" placeholder="Last Name .." className="form-input mt-4" name="lastName" required/>
                <br />
                <input type="text" id="id_number" placeholder="Student ID .." className="form-input mt-4" name="id_number" required/>
                <br />
                {/* for now it's not used */}
                <input type="password" placeholder="Password .." className="form-input mt-4" name="password" required/>
                <br /> 
                <label htmlFor="file" className="form-input mt-4 pointer dim">Upload your Image</label>
                <input type="file" id="file" className="form-file mt-4" multiple accept="image/*"  required/>
                <br />
                <button type="submit" id='submit'  className="btn btn-success btn-submit mt-4" onClick={this.setImage} >
                Register
                </button>
            </form>
            </>
        );}
}
export default StudentRegister ;