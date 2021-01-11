import React, { Component } from 'react';
import Details from './Details';


class History extends Component {

    constructor() {
        super();
        this.state = {
            history: [],
            students: [],
            allStudents:[],
            imgs: [],
            date: '',
            showDitails: false
        }
    }
    componentDidMount() {
        let url = `http://localhost:3000/classHistory/${this.props.selected_class}`;
        fetch(url)
            .then(response => response.json())
            .then(classData => {
                this.setState({ 
                    history: classData.history ,
                    allStudents: classData.students
                });
            })
            .catch(e => { console.log("error while getting history data \n", e) });
    }
    renderTable = () => {
        let historyData = this.state.history;
        let rows = historyData.map((history, ind) => {
            return (
                <tr key={ind}>
                    <td className="f3 ">{history.date}</td>
                    <td><button className="btn f4 btn-dark shadow btn-submit grow " onClick={() => { this.showDitails(history._id) }}>showDetails</button></td>
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
                    showDitails:true
                })
            }
        })

    }
    render() {
        let rows = this.renderTable();
        let {students, allStudents, imgs, date} = this.state;
        let className = this.props.selected_class;
        
        let historyData={students, allStudents, imgs, date, className};
        return (
            <>
                {this.state.showDitails && (<Details historyData={historyData} />)}
                { ! this.state.showDitails &&(<>
                    <div className="table-responsive mt-3">
                        <table className="table table-bordered" style={{ width: '100%' }}>
                            <thead className="text-dark f2" style={{ fontFamily: 'Lobster', letterSpacing: '2px' }}>
                                <tr>
                                    <th>Date</th>
                                    <th>Details</th>
                                </tr>
                            </thead>
                            <tbody id='body' style={{ fontFamily: 'Acme', color: 'gray' }}>
                                {rows}
                            </tbody>
                        </table>
                    </div>
                </>)}
            </>
        )
    }
}
export default History;