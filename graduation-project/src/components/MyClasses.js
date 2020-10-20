import React, { Component } from 'react' ;
import noImage from '../noImage.png' ;

class MyClasses extends Component{
    constructor(){
        super() ;
        this.state = {
            file: null , 
            width : 0 ,
            height : 0
        }
    }
    checkAttendence = (e) => {
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
            var final_image = canvas.toDataURL("image/png");
            this.setState({
                file : final_image
            });
            let obj = result ;
            console.log(obj) ;
        })
        .catch(error => console.log('error', error));
    };


    render() {
        return (
            <>
                <div className="mt-3 bg-black-10 shadow-5 p-5 ">
                    <h1 className="main-title">Upload an image to check attendence</h1>
                    <input onChange={this.checkAttendence} type="file" accept="image/*" id="file2" className="form-file mt-4" required />
                    <br />

                    {/* Image will display the uploaded image , we use it to draw it on canvas . */}
                    <img hidden id="person" src={this.state.file} alt="Person" />

                    {/* Canvas will draw the image , rectangles and names . */}
                    <canvas id="canvas" width={this.state.width} height={this.state.height} hidden></canvas>

                    {/* The final result will be shown on the img below , that we can edit it's width and height . */}
                    <img className="img-thumbnail mt-3" src={this.state.file || noImage} alt="Person" width="600" height='600' />
                </div>
            </>);
    }
}
export default MyClasses ;