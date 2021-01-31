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
                <div onClick={() => { window.open(img, "_blank") }} style={style} key={ind} className="my-shad br3 grow pointer">
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
                <div style={{marginTop: '-5%'}}>
                    <div className="jsBack" >
                        <button hover-data="Back"
                            onClick={this.back} className="red-btn my-button" >
                            <i className="btn-icon far fa-arrow-alt-circle-left"></i>
                        </button>
                    </div>
                    <h2 className=" mt2 font-rec" >{`Details of ${this.props.historyData.date}, for ${this.props.historyData.className} class.`}</h2>
                    <div className="my-line neg"></div>
                    <div className="pv3 mb5">
                        <h4 className="font-rec">Attendants Students.</h4>
                        <div className="table-container mt-3">
                        <table className="table1">
                            <thead className="text-dark">
                                <tr>
                                    <th>Student ID</th>
                                    <th>Student Name</th>
                                </tr>
                            </thead>
                            <tbody className="tableBody">
                                {attend}
                            </tbody>
                        </table>
                        </div>

                    </div>
                    <h3 className="font-rec">Class Images</h3>
                    <div id="imageContainer" className="row ma4">
                        {imgTags}
                    </div>
                </div>
            </>
        )
    }
}
export default Details;