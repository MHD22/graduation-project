import React from 'react';
import { Component } from 'react';
import './details.css';
import './table.css';

class Details extends Component {
    constructor() {
        super();
        this.state = {}
    }

    getImages = () => {
        let images = this.props.historyData.imgs;
        let imgTags = images.map((img, ind) => {
            let style = {
                'height': '400px',
                'backgroundColor': 'rgba(0,0,0,0)',
                'backgroundImage': `url(${img})`,
                'backgroundSize': 'cover',
                'backgroundRepeat': 'no-repeat',
                'backgroundPosition': 'center',
                'borderRadius': '20px'
            }
            return (
                <div onClick={() => { window.open(img, "_blank") }} style={style} key={ind} className="shadow br3 grow pointer dim">
                </div>
            )
        })
        return imgTags;
    }

    back = () => {
        let route = this.props.backToHistory ? '/show/classHistory' : '/show';
        this.props.onChangeRoute(route, 0);
    }

    getAttend = () => {
        let { allStudents, students } = this.props.historyData;
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

        return stdTable;
    }
    render() {
        let attend = this.getAttend();
        let imgTags = this.getImages();
        return (
            <>
                <button hover-data="Back"
                    onClick={this.back} className="red-btn my-button" >
                    <i className="btn-icon far fa-arrow-alt-circle-left"></i>
                </button>
                <h2 className="orange mt2 font-lobster" >{`Details of ${this.props.historyData.date} day, for ${this.props.historyData.className}.`}</h2>
                <div className="pa3 ph6 f3 mb5">
                    <h4 className="green b" style={{ fontFamily: 'Lobster', letterSpacing: '3px' }}>Attendants Students.</h4>
                    <table id="table1">
                        <thead className="text-dark" style={{ fontFamily: 'Lobster', letterSpacing: '2px' }}>
                            <tr>
                                <th>Student ID</th>
                                <th>Student Name</th>
                            </tr>
                        </thead>
                        <tbody id='body' style={{ fontFamily: 'Acme', color: 'gray' }}>
                            {attend}
                        </tbody>
                    </table>
                </div>
                <h3 className="font-acme">Class Images</h3>
                <div id="imageContainer" className="row ma4">
                    {imgTags}
                </div>
            </>
        )
    }
}
export default Details;