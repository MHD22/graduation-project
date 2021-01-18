import React from 'react' ;
import { Component } from 'react';



class T1 extends Component {
    constructor(){
        super() ;
        this.state = {
            show : false
        }
    }

    clicked = () => {
        this.setState({
            show : true 
        }) ;
    }
    render(){
        return (
            <>
            <h1 className="main-title">Welcome to Test1</h1>
            </>
        )
    }
}
export default T1 ;