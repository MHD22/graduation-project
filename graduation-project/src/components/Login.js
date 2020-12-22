import React from 'react' ;

function Login(){

    const checkId=(event)=>{

        event.preventDefault();
        const form = document.getElementById('signInForm');
        let user= {id: form.teacherId.value , password:form.teacherPassword.value };

          checkTheUserData(user)
          .then(userData=>{

            if(isUserLoggedIn(userData)){
                storedUserInSession(userData);
                goToHomePage();   
            }
            else{
                alert("ID OR Password is wrong! \n try again..")
            }

        })
        .catch(e=>{console.log("error during send user data to backend within the sign in page.")});    
    };
    return(
        <>
        <h1 className="main-title">Login Page</h1>
        <form className="mt-3" id='signInForm' >
            <input name='teacherId' type="text" placeholder="Teacher ID .." className="form-input mt-4" required/>
            <br/>
            <input name='teacherPassword' type="password" placeholder="Password.." className="form-input mt-4" required/>
            <br />
            <input type="submit" id='submit' onClick={checkId} value="Login" className="btn btn-success btn-submit mt-4"/>
        </form>
        </>
    );
}
export default Login



//helper functions:

function isUserLoggedIn (userData){
    if(userData.length===1){
        return true;
    }
    return false;
}

function storedUserInSession(userData){
    const {firstName,lastName,id_number} = userData[0];
    const storedData = {firstName,lastName,id_number};
    sessionStorage.setItem('teacher',JSON.stringify(storedData));
}

function goToHomePage(){
    window.location.replace("http://localhost:3001");
}

function checkTheUserData(user){
    return fetch('http://localhost:3000/loginTeacher',{
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
    })
    .then(res => res.json())

}