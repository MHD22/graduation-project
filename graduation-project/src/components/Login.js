import React from 'react' ;


function Login(){
    return(
        <>
        <h1 className="main-title">Login Page</h1>
        <form className="mt-3">
            <input type="text" placeholder="Student ID .." className="form-input mt-4" />
            <br />
            <input type="submit" id='submit' value="Login" className="btn btn-success btn-submit mt-4" />
        </form>
        </>
    );
}
export default Login