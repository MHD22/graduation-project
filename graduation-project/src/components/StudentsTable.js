import React from 'react' ;


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
            <div className="table-responsive mt-3">
                <table className="table table-bordered" style={{ width : '100%' }}>
                    <thead className="text-dark" style={{ fontFamily : 'Lobster', letterSpacing : '2px' }}>
                        <tr>
                            <th>Student ID</th>
                            <th>Student Name</th>
                        </tr>
                    </thead>
                    <tbody id='body' style={{ fontFamily : 'Acme' , color : 'gray' }}>
                        {rows}
                    </tbody>
                </table>
            </div>
        </>
    );
}
export default StudentsTable;