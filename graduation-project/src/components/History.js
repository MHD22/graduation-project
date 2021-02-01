import React, { Component } from 'react';
import Details from './Details';
import { Redirect } from 'react-router-dom';
import '../css/table.css';
import '../css/myClasses.css';

class History extends Component {

    constructor() {
        super();
        this.state = {
            history: [],
            students: [],
            allStudents: [],
            imgs: [],
            date: '',
            showDitails: false,
            route: null
        }
    }
    componentDidMount() {

        let baseUrl = document.getElementById('baseUrl').defaultValue;
        let url = `${baseUrl}/classHistory/${this.props.selected_class}`;
        fetch(url)
            .then(response => response.json())
            .then(classData => {
                let allStudents = classData.students.map(std => {
                    return {
                        id: std.id_number,
                        name: std.firstName + ' ' + std.lastName
                    }
                })
                this.setState({
                    history: classData.history,
                    allStudents: allStudents
                });
            })
            .catch(e => { console.log("error while getting history data \n", e) });
    }
    renderTable = () => {
        let historyData = this.state.history;
        let rows = historyData.map((history, ind) => {
            return (
                <tr key={ind}>
                    <td className="date">{history.date}</td>
                    <td><button className="shadow grow my-button detailsBtn" hover-data="Show Details" onClick={() => { this.showDitails(history._id) }}><i class="f4 btn-icon fas fa-question"></i></button></td>
                </tr>
            )
        });
        return rows;
    }
    showDitails = (classID) => {
        let history = this.state.history;
        history.forEach(hist => {
            if (classID === hist._id) {
                this.setState({
                    students: hist.students,
                    imgs: hist.images,
                    date: hist.date,
                    showDitails: true
                })
            }
        })
    }

    back = () => {
        this.props.onChangeRoute('/show/classData', 0);
    }
    render() {
        let rows = this.renderTable();
        let { students, allStudents, imgs, date } = this.state;
        let className = this.props.selected_class;
        let historyData = { students, allStudents, imgs, date, className };
        return (
            <>
                {this.state.route ? <Redirect exact to={this.state.route} /> : null}
                {this.state.showDitails && (<Details historyData={historyData} onChangeRoute={this.props.onChangeRoute} backToHistory={true} />)}
                { !this.state.showDitails && (<div className="history">
                    <div className="jsBack">
                        <button hover-data="Back"
                            onClick={this.back} style={{}} className="red-btn my-button " >
                            <i className="btn-icon far fa-arrow-alt-circle-left"></i>
                        </button>
                    </div>
                    <div className="table-container mt-3">
                        {this.state.history.length != 0 ?
                            <table className="table1">
                                <thead className="text-dark" >
                                    <tr>
                                        <th>Date</th>
                                        <th>Details</th>
                                    </tr>
                                </thead>
                                <tbody className="tableBody">
                                    {rows}
                                </tbody>
                            </table>
                        :
                        <h1>No Data Available</h1>
                        }
                    </div>
                </div>)}
            </>
        )
    }
}
export default History;