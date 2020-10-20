import React from 'react' ;


function StudentsTable({students}){
    let rows = students.map( (std)=>{
       return( 
       <tr key={std.id}>
            <td>{std.id}</td>
            <td>{std.name}</td>
       </tr>
        )
    });

    let hidden=false;
    return(
        <>
            <table  border='1' cellSpacing='5'  hidden={hidden}>
                <thead>
                    <tr>
                        <th>ID Number</th>
                        <th>Student Name</th>
                    </tr>
                </thead>
                <tbody>
                    {rows}
                </tbody>
                
                

            </table>
        </>
    );
}
export default StudentsTable;