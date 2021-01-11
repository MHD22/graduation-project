import React from 'react';
import './details.css';

function Details({ historyData }) {


    function getImages() {
        let images = historyData.imgs;
        let imgTags = images.map((img, ind) => {
            return (
                <div key={ind} className="br3">
                    <img src={img} className="br3 shadow" alt={ind} />
                </div>
            )
        })
        return imgTags;
    }

    function getAttend() {
        let { allStudents, students } = historyData;
        let stdTable = students.map(stdID => {
            let name;
            allStudents.forEach(found => {
                if (found.id_number === stdID) {
                    name = found.firstName + ' ' + found.lastName;
                }
                
            });
            return (
                <tr key={stdID}>
                    <td>{stdID}</td>
                    <td>{name}</td>
                </tr>
            )
        })

        return stdTable ;
    }
    let attend = getAttend();
    console.log(attend)
    let imgTags = getImages();
    return (

        <>
        <div className="pa3 ph6 f3 mb5">
            <table className="table table-bordered" style={{ width : '100%' }}>
                    <thead className="text-dark" style={{ fontFamily : 'Lobster', letterSpacing : '2px' }}>
                        <tr>
                            <th>Student ID</th>
                            <th>Student Name</th>
                        </tr>
                    </thead>
                    <tbody id='body' style={{ fontFamily : 'Acme' , color : 'gray' }}>
                        {attend}
                    </tbody>
                </table>
            </div>
            <div id="imageContainer" className="row  ma4 shadow">
                {imgTags}
            </div>
            

        </>
    )
}
export default Details;