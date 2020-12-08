import { Button } from 'react-bootstrap';
import React, { Component } from 'react' ;
import noImage from '../noImage.png' ;
import StudentsTable from './StudentsTable';

class MyClasses extends Component{
    constructor(){
        super() ;
        this.state = {
            file: null , 
            width : 0 ,
            height : 0,
            faces:[],
            students:[] ,
            showImage : true ,
            showUploadBtn : false ,
            load : false ,
            hidePage : false ,
            classes : [] 
        }
    }

    componentDidMount(){
        this.checkLoggedIn() ;
        fetch('http://localhost:3000/teacherClasses?id=' + JSON.parse(sessionStorage.getItem('teacher')).id_number)
        .then(res=> res.json()).then(data=>{
            this.setState({
                classes : data
            })
            console.log(data);
            console.log('State' , this.state.classes) ;
        })
        .catch(e=>console.log(e));
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

    

    checkAttendence = (e) => {
        this.setState({
            load : true
        });
        //Create a reader to read an uploaded file .
        var reader = new FileReader();
        reader.readAsDataURL(e.target.files[0]);
        
        reader.onload = (event) => {
        //Get the uploaded image and store it in var image .
        var image = new Image();
        image.src = event.target.result;

        //Create to variable to store image width and height .
        var imgHeight , imgWidth ;
        image.onload = async function () {
            imgHeight = this.height ;
            imgWidth = this.width ;

            //The function will store width and height values in State . 
            setData() ;
        }
        let setData = () => {
            this.setState({
                width : imgWidth ,
                height : imgHeight
            }) ;
        }
    };

        const img = e.target ;
        if(img){
            this.setState({
                file: URL.createObjectURL(e.target.files[0])
            })
            this.faceRecognition(img.files[0]) ;
        }
        e.target.value = null;
    }

    setShowBtn = () => {
        this.setState({
            showUploadBtn : true 
        });
    }


    faceRecognition = (img) => {
        var myHeaders = new Headers();
        myHeaders.append("token", "0ed0d51e90cc4f3ab510a564cfb94b60");

        var formdata = new FormData();
        formdata.append("photo", img, "file");

        var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: formdata,
        redirect: 'follow'
    };

        fetch("https://api.luxand.cloud/photo/search", requestOptions)
        .then(response => response.json())
        .then(result => {
            let faces=[];
            //Define canvas to draw rectangle .
            let canvas = document.getElementById('canvas') ;
            let ctx = canvas.getContext('2d') ;

            //Canvas properties .
            ctx.strokeStyle = 'yellow' ;
            ctx.fillStyle = 'yellow' ;
            ctx.lineWidth = '5' ;

            //Change the background of context to the uploaded image .
            var image = document.getElementById('person') ;
            ctx.drawImage(image , 0 , 0) ;
            
            for(var i in result){
            if(result[i].probability*100 < 90){
                continue;
            }
            faces.push(result[i].id);
            //Get the values of Rectangle .
            let {left} = result[i].rectangle ,
            {right} = result[i].rectangle ,
            {bottom} = result[i].rectangle ,
            {top} = result[i].rectangle ;

            //Determine the width and hight for rectangle .
            let Dim = (right - left) ;

            //Determine font size and the space between rectangle and text .
            let space = parseInt(Dim / 3) ,
            text = `${space}px Lobster`  ;
            ctx.font = text ;

            //Draw the rectangle .
            ctx.strokeRect(left,top,Dim,Dim) ;

            //Type the name of person .
            ctx.fillText(result[i].name , left, bottom + space) ;
            }
            this.setState({faces:faces , showImage : false});
            console.log('faces ids: ', this.state.faces);


            var final_image = canvas.toDataURL("image/png");
            this.setState({
                file : final_image
            });
            
            console.log(result) ;
            this.colorTable(result) ;
            this.setState({
                load : false
            });
            
        })
        .catch(error => console.log('error', error));
    };

    colorTable = (result) => {
        var {students} = this.state ;
        for(var student of students){
            document.getElementById(student.id).className = '' ;
            var stName = student.name ;
            for(var res of result){
                var resName = res.name ;
                if(stName === resName && res.probability * 100 > 90){
                    console.log(student.id) ;
                    document.getElementById(student.id + "").className = 'bg-success text-light' ;
                }
            }
        }
    }

    clear = () => {
        this.setState({
            showImage : true ,
            showUploadBtn : false 
        }) ;
        var {students} = this.state ;
        for(var student of students){
            document.getElementById(student.id).className = '' ;
        }
    }

    classClicked = (e) => {
        const name = e.target.getAttribute('data-class') ;
        var arr = []
        this.state.classes.forEach(element => {
            if(element.className === name){
                element.students.forEach((std)=>{
                    arr.push({id:std.id_number , name:std.firstName + std.lastName})
                })
            }
        });
        this.setState({
            students:arr ,
            hidePage : true 
        })       
    }

    render() {
        let bgColors = ['bg-dark' , 'bg-primary' , 'bg-info' , 'bg-success' , 'bg-secondary'] ;
        let rows = this.state.classes.map((cs)=>{
            const num = parseInt(Math.random() * bgColors.length) ;
            const classNames = `${bgColors[num]} col-md-5 ml-1 class rounded mt-1 text-center text-light` ;
            return( 
                <div onClick={this.classClicked} key={cs._id} data-class={cs.className} data-student={cs.students} id={cs._id} className={classNames}>
                    <h1 data-class={cs.className}>{cs.className}</h1>
                    <p data-class={cs.className}>Students : {cs.students.length}</p>
                </div>
            )
         });

        return (
            <>  
                <div className="container" hidden={!this.state.hidePage}>
                    {/* Spinner when get the result */}
                    <div className="loading" hidden={!this.state.load}>
                        <div className="circle"></div>
                        <div className="circle"></div>
                        <div className="circle"></div>
                        <div className="circle"></div>
                    </div>

                    <div className="row" hidden={this.state.load}>

                        {/* Student table */}
                        <div className="col-md-6">
                            <h3 className="mt-2" style={{ fontFamily : 'Lobster' , color : '#343a40' }}>Student of the course</h3>
                            <StudentsTable students={this.state.students}/>
                        </div>
                        
                        {/* Face recognition */}
                        <div className="col-md-6 align-self-center">
                            <Button hidden = {this.state.showUploadBtn} onClick={this.setShowBtn} style={{ width : '100%' }} className="btn f3 grow btn-dark btn-submit mt-4">Check Attendence</Button>
                            <div hidden = {!this.state.showUploadBtn}>
                                <label htmlFor="file2" style={{ width : '50%' , backgroundColor : 'darkcyan' }} className="mt-3 grow f4 btn text-light btn-submit">Upload Image</label>
                                <input hidden onChange={this.checkAttendence} type="file" accept="image/*" id="file2" className="form-file mt-4" required />
                                <br />
                                <p hidden={!this.state.showImage} className="mt-5" style={{ fontFamily : 'Acme' }}>To Check Attendence Upload an image for class student , then the system will check it .</p>
                                <p hidden={!this.state.showImage} style={{ fontFamily : 'Acme' }}><span className="bg-success p-1 text-light rounded">Green</span> rows on table represents the Attendees student , and the <span className="bg-dark p-1 text-light rounded">white</span> rows for Absence students . </p>

                                {/* Image will display the uploaded image , we use it to draw it on canvas . */}
                                <img hidden id="person" src={this.state.file} alt="Person" />

                                {/* Canvas will draw the image , rectangles and names . */}
                                <canvas id="canvas" width={this.state.width} height={this.state.height} hidden></canvas>

                                {/* The final result will be shown on the img below , that we can edit it's width and height . */}
                                <img className="img-thumbnail mt-5" src={this.state.file || noImage} alt="Person" width="400" height='400' hidden = {this.state.showImage} />
                                <br />
                                <Button hidden = {this.state.showImage} onClick={this.clear} style={{ width : '30%' }} className="btn f3 grow btn-warning btn-submit mt-4">Clear</Button>
                                <a className="btn f3 grow btn-info btn-submit mt-4" style={{ width : '30%' }} hidden = {this.state.showImage} href={`${this.state.file}`} download>Download</a>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container text-center" hidden={this.state.hidePage}>
                    <h1 className="main-title">Select A Class</h1>
                    <div className="row d-flex justify-content-center">
                        {rows}
                    </div>
                </div>
            </>);
    }
}
export default MyClasses ;
