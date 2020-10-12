import React from 'react' ;

function Register(){
    return(
        <>
        <h1 className="main-title">Register Page</h1>
        <div className="mt-3 bg-black-10 shadow-5 p-5 ">
            <input type="text" placeholder="Full Name .." className="form-input mt-4" />
            <br />
            <input type="text" placeholder="Student ID .." className="form-input mt-4" />
            <br />
            <input type="text" placeholder="Student Major .." className="form-input mt-4" />
            <br />
            <label for="file" className="form-input mt-4 pointer dim">Upload your Image</label>
            <input type="file" id="file" placeholder="Student Major .." className="form-file mt-4" />
            <br />
            <input type="submit" id='submit' value="Register" className="btn btn-success btn-submit mt-4" />
        </div>
        </>
    );
}
export default Register ;