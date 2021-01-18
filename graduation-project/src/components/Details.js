import React, { useState } from 'react';
import './details.css';
import { Redirect } from 'react-router-dom' ;

function Details({ historyData }) {
    const [router, setRouter] = useState(0);
    console.log("history Data:",historyData);
    function getImages() {
        let images = historyData.imgs;
        let imgTags = images.map((img, ind) => {
            let style = {
                'height': '400px',
                'backgroundColor': 'rgba(0,0,0,0)',
                'backgroundImage': `url(${img})`,
                'backgroundSize': '100% 100%',
                'backgroundRepeat': 'no-repeat',
                'backgroundPosition': 'center',
                'borderRadius': '17%'
            }
            return (
                <div onClick={()=>{window.open(img,"_blank")}} style={style} key={ind} className="shadow br3 grow pointer dim">
                </div>
            )
        })
        return imgTags;
    }

    function back() {
        setRouter('/show/') ;
        console.log(router) ;
    }

    function getAttend() {
        let { allStudents, students } = historyData;
        let stdTable = students.map(stdID => {
            let name;
            allStudents.forEach(found => {
                if (found.id === stdID) {
                    name = found.name;
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
        {router ? <Redirect to={router} /> : null}
        <img className="mt-2 grow pointer" onClick={back} src="https://img.icons8.com/fluent/48/000000/circled-left.png" alt="go back" />
        <h2 className="orange mt4 b" style={{ fontFamily : 'Lobster', letterSpacing : '3px' }}>{`Details of ${historyData.date} day, for ${historyData.className}.`}</h2>
        <div className="pa3 ph6 f3 mb5">
            <h4 className="green b" style={{ fontFamily : 'Lobster', letterSpacing : '3px' }}>Attendants Students.</h4>
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