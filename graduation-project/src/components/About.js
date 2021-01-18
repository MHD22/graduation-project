import React, { Component } from 'react';
import {Route } from 'react-router-dom';
import T1 from './T1';
import T2 from './T2';

class About extends Component {
    constructor() {
        super();
        this.state = {}
    }
    componentDidMount(){
        
    }
    render() {
        let {url,path} = this.props.match;
        console.log("url:",url,"\nPath:",path);
        return (
            <div>
                <Route exact path={`${path}`}>
                <h1 className="main-title">About Us</h1>
                </Route>
                <Route path={`${path}/test1`} component={T1}/>
                <Route path={`${path}/test2`} component={T2}/>

            </div>
        )
    }
}
export default About;