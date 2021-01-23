import React, { Component } from 'react';
import Swal from 'sweetalert2'
class About extends Component {
    constructor() {
        super();
        this.state = {}
    }

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

  opensweetalertdanger()
  {
    Swal.fire({
      title: 'Therichpost',
      text: "OOPS",
      type: 'warning',
      icon: 'warning'
      
      
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