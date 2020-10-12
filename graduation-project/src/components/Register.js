import React from 'react' ;
import './Register.css' ;

function Register(){
    return(
        <>
        <h1 className="main-title">Register Page</h1>
        <form className="mt-3">
            <input type="text" placeholder="Full Name .." className="form-input mt-4" />
            <br />
            <input type="text" placeholder="Student ID .." className="form-input mt-4" />
            <br />
            <input type="text" placeholder="Student Major .." className="form-input mt-4" />
            <br />
            <label for="file" className="form-input mt-4">Upload your Image</label>
            <input type="file" id="file" placeholder="Student Major .." className="form-file mt-4" />
            <br />
            <input type="submit" id='submit' value="Register" className="btn btn-success btn-submit mt-4" />
        </form>
        </>
    );
}
export default Register ;