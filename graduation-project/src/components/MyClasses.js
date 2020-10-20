import React, { Component } from 'react' ;
import img from '../img.jpeg';

class MyClasses extends Component{
    constructor(){
        super() ;
        this.state = {
            file: null,
            size: 0
        }
    }
    checkAttendence = (e) => {
        
        
        console.log(e.target.clientWidth);
        const img = e.target ;
        var im1 =document.getElementById('img1');
        if(img){
            this.setState({
                file: URL.createObjectURL(e.target.files[0]),
                size: im1.clientWidth
            })
            this.faceRecognition(img.files[0]) ;
            
        }
    }
    componentDidMount(){
        // //left: 111, top: 11, right: 487, bottom: 387}
        
        



        // let img1 = document.getElementById('img1');
        // let w = 400;
        // let h = 400;
        // let top=11,right=487,bottom=387,left=111;
        // let top2 = top ;
        // let bottom2 =h-bottom;
        
        // let canvas = document.getElementById('canvas');
        // let ctx = canvas.getContext('2d');

        // ctx.strokeRect(left,top,(right+left)-w,(top+bottom));
        
        // const data= d.outputs[0].data.regions[0].region_info.bounding_box;
        // const photo = document.getElementById("faceImage");
        // const width = Number(photo.width);
        // const height= Number(photo.height);
        // return {
        // top : data.top_row * height ,
        // bottom : height - (Number(data.bottom_row)*height) ,
        // right : width-(Number(data.right_col)*width),
        // left : (Number(data.left_col)*width)


       

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
        
            console.log(result, 'size is :'+ this.state.size) ;
        })
        .catch(error => console.log('error', error));
    };


    render() {
        
        var divStyles={
            position: 'absolute',
            width:'382px',
            height:'382px',
            
            border: '3px solid black',
            top:-2,
            right:486,
            bottom:380,
            left:104
        }
        var div=<div style={divStyles}></div>;
         
        return (
            <>
                <div className="mt-3 bg-black-10 shadow-5 p-5 ">
                    <h1 className="main-title">Upload an image to check attendence</h1>
                    <input onChange={this.checkAttendence} type="file" accept="image/*" id="file2" className="form-file mt-4" required />
                    <br />
                    <div className='draw-image'>
                    {div}
                    <img id='img1'  className=" rounded" src={this.state.file || 'https://via.placeholder.com/400/'} alt='person'/>
                    </div>
                    {/* <canvas style ={{backgroundImage: `url(${img||this.state.file || 'https://via.placeholder.com/400/'})` }}id ='canvas' width='400' height='400'></canvas> */}
                    
                </div>
            </>);
    }
}
export default MyClasses ;
