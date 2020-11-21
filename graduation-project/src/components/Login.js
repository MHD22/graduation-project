import React from 'react' ;
import { BrowserRouter as Router,Link} from 'react-router-dom';


function Login(){

    const checkId=(e)=>{
        e.preventDefault();
        const form = document.getElementById('signInForm');
        // form.preventDefault();
        console.log(form.teacherId.value,form.teacherPassword.value);
        fetch('http://localhost:3000/loginTeacher',{
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({id: form.teacherId.value , password:form.teacherPassword.value }),
        }).then(res => res.json())
        .then(data=>{
            if(data.length === 1){
                const {firstName,lastName,id_number} = data[0];
                const storedData = {firstName,lastName,id_number};
                sessionStorage.setItem('teacher',JSON.stringify(storedData));

                window.location.reload();
            }
        })
        .catch("error during send student data to backend");

    
    };
    return(
        <>
        <h1 className="main-title">Login Page</h1>
        <form className="mt-3" id='signInForm' >
            <input name='teacherId' type="text" placeholder="Teacher ID .." className="form-input mt-4" required/>
            <br/>
            <input name='teacherPassword' type="password" placeholder="Password.." className="form-input mt-4" required/>
            <br />
            <Router>
                <Link exact to="/">
                <input type="submit" id='submit' onClick={checkId} value="Login" className="btn btn-success btn-submit mt-4"  />
                </Link>
            </Router>
        </form>
        </>
    );
}
export default Login