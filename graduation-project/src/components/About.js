import React, { Component } from 'react';
import Swal from 'sweetalert2'
// import {Route } from 'react-router-dom';
// import T1 from './T1';
// import T2 from './T2';

class About extends Component {
    constructor() {
        super();
        this.state = {}
    }

      //Button Click Function
  opensweetalert()
  {
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
         alert("Hello World !") ;
       }
    })
  }
  //Button Click Function
  opensweetalertdanger()
  {
    Swal.fire({
      title: 'Therichpost',
      text: "OOPS",
      type: 'warning',
      
      
    })
  }
  render() {
   
    return (
<div className="maincontainer">
  
  <h1>Reactjs</h1>
  
  <button onClick={this.opensweetalert}>Open Success Sweetalert Popup</button>
  <button onClick={this.opensweetalertdanger}>Open Danger Sweetalert Popup</button>
</div>
)
};
}
export default About;

/*
let {url,path} = this.props.match;
console.log("url:",url,"\nPath:",path);
<Route exact path={`${path}`}>
    <h1 className="main-title">About Us</h1>
</Route>
<Route path={`${path}/test1`} component={T1}/>
<Route path={`${path}/test2`} component={T2}/>
*/