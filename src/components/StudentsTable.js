import React from 'react' ;
import '../css/table.css';


function StudentsTable({students}){
    let rows = students.map( (std)=>{
       return( 
       <tr id={std.id} key={std.id}>
            <td>{std.id}</td>
            <td>{std.name}</td>
       </tr>
        )
    });

    return(
        <>
            <div className="table-container mt-3">
                <table id="" className=" table1">
                    <thead className="text-dark">
                        <tr>
                            <th>Student ID</th>
                            <th>Student Name</th>
                        </tr>
                    </thead>
                    <tbody className="tableBody">
                        {rows}
                    </tbody>
                </table>
            </div>
        </>
    );
}
export default StudentsTable;