import { Button } from 'react-bootstrap';
import React, { Component } from 'react';
import noImage from '../noImage.png';
import StudentsTable from './StudentsTable';
import Details from './Details';
import History from './History';
import { storage } from '../firebase/index';

class MyClasses extends Component {
    constructor() {
        super();
        this.state = {
            file: null,
            width: 0,
            height: 0,
            ids: [],
            students: [],
            absenceStudents: [],
            attendStudents: [],
            showImage: true,
            showUploadBtn: false,
            load: false,
            hidePage: false,
            classes: [],
            selected_class: '',
            imgs: [],
            faces: [],
            disableButton: false,
            direction:'check' // OR history , details

        }
    }

    // Get all the classes for the logged in teacher .
    componentDidMount() {
        this.checkLoggedIn();
        fetch('http://localhost:3000/teacherClasses?id=' + JSON.parse(sessionStorage.getItem('teacher')).id_number)
            .then(res => res.json()).then(data => {
                this.setState({
                    classes: data
                })
            })
            .catch(e => console.log(e));
    }

    //To Check if LoggedIn .
    checkLoggedIn = () => {
        const data = sessionStorage.getItem('teacher');
        if (!data) {
            window.location.replace('http://localhost:3001/login');
        }
        else {
            this.setState({
                hidePage: false
            })
        }
    }

    // Will check the faces from the uploaded image .
    checkAttendence = (e) => {
        this.setState({
            load: true
        });

        //Create a reader to read an uploaded file .
        let reader = new FileReader();
        reader.readAsDataURL(e.target.files[0]);

        reader.onload = (event) => {
            //Get the uploaded image and store it in let image .
            let image = new Image();
            image.src = event.target.result;

            //Create to letiable to store image width and height .
            let imgHeight, imgWidth;
            image.onload = async function () {
                imgHeight = this.height;
                imgWidth = this.width;

                //The function will store width and height values in State . 
                setData();
            }
            let setData = () => {
                this.setState({
                    width: imgWidth,
                    height: imgHeight
                });
            }
        };

        const img = e.target;
        if (img) {
            this.setState({
                file2: e.target.files[0],
                file: URL.createObjectURL(e.target.files[0])
            })
            this.faceRecognition(img.files[0]);
        }
        e.target.value = null;
    }

    // To show checkAttendence page .
    setShowBtn = () => {
        this.setState({
            showUploadBtn: true
        });
    }

    sendHistoryData = () => {
        debugger
        let requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'ids': this.state.ids,
                'imgs': this.state.imgs
            }),
        };

        fetch(`http://localhost:3000/history/${this.state.selected_class}`, requestOptions)
            .then(res => res.json())
            .then(console.log)
            .catch(e => { console.log("An Error occured while sending history Data ..", e) });

        this.setState({
            ids: [],
            imgs: [],
            selected_class: [],
            disableButton: true,
            direction:'history'
        })
    }

    // To detect faces from an image .
    faceRecognition = (img) => {

        let formdata = new FormData();
        formdata.append("photo", img, "file");

        let requestOptions = {
            method: 'POST',
            body: formdata,
            redirect: 'follow'
        };



        fetch('http://localhost:3000/checkImage', requestOptions)
            .then(response => response.json())
            .then(result => {

                console.log(result);
                //Define canvas to draw rectangle .
                let canvas = document.getElementById('canvas');
                let ctx = canvas.getContext('2d');

                //Canvas properties .
                ctx.strokeStyle = 'yellow';
                ctx.fillStyle = 'yellow';
                ctx.lineWidth = '5';

                //Change the background of context to the uploaded image .
                let image = document.getElementById('person');
                ctx.drawImage(image, 0, 0);
                let studetnsIDs = this.state.students.map(std => {
                    return std.id
                });
                let { ids } = this.state;
                for (let i in result) {
                    let name = result[i].name.substring(0, result[i].name.indexOf('|'));
                    let id = result[i].name.substring(result[i].name.indexOf('|') + 2);
                    if (!studetnsIDs.includes(id)) {
                        continue;
                    }
                    if (result[i].probability * 100 < 90) {
                        continue;
                    }

                    if (!ids.includes(id)) {
                        ids.push(id);
                    }

                    //Get the values of Rectangle .
                    let { left, right, bottom, top } = result[i].rectangle;

                    //Determine the width and hight for rectangle .
                    let Dim = (right - left);

                    //Determine font size and the space between rectangle and text .
                    let space = parseInt(Dim / 3),
                        text = `${space}px Lobster`;
                    ctx.font = text;

                    //Draw the rectangle .
                    ctx.strokeRect(left, top, Dim, Dim);

                    //Type the name of person .
                    ctx.fillText(name, left, bottom + space);
                }
                this.setState({
                    ids: ids,
                    // imgs : [imagesLink]
                });
                let space = this.state.width / 20;
                ctx.fillStyle = 'black';
                let text = `${space}px serif`;
                ctx.font = text;
                ctx.fillText(new Date().toLocaleString(), (this.state.width / 2) - 5 * space, 50);
                this.setState({ showImage: false });
                // Store image in firebase ........
                let dataURL = canvas.toDataURL("image/png");
                console.log(ids);
                this.setState({
                    file: dataURL
                });

                let formdata = this.getImageURL(dataURL);
                this.convertImageToURL(formdata.get('image'));

                console.log("Imgs : ", this.state.imgs);
                this.colorTable(result);
                this.setState({
                    load: false
                });

            })
            .catch(error => console.log('error', error));
    };

    getImageURL(dataURL) {
        let blobBin = atob(dataURL.split(',')[1]);
        let array = [];
        for (let i = 0; i < blobBin.length; i++) {
            array.push(blobBin.charCodeAt(i));
        }
        let file = new Blob([new Uint8Array(array)], { type: 'image/png' });
        let formdata = new FormData();
        formdata.append("image", file);
        return formdata;
    }

    convertImageToURL(image) {
        if (image) {
            const upload = storage.ref(`images/${image.name}`).put(image);
            upload.on('state_changed',
                (snapshot) => { },
                (err) => {
                    console.log("error while getting data from firebase.\n", err);
                    return '';
                },
                () => {
                    storage.ref('images').child(image.name).getDownloadURL().then(urll => {
                        console.log(urll);

                        let imgs = [].concat(this.state.imgs);
                        imgs.push(urll);
                        this.setState({
                            imgs: imgs
                        })
                        return urll;
                    })

                })
        }
    }

    // To change the row color according to the attendence .
    colorTable = (result) => {
        let { ids } = this.state;
        for (let i of ids) {
            document.getElementById(i + "").className = 'bg-success text-light';
        }
    }

    // Clear data from upload image and recolor the table .
    clear = () => {
        this.setState({
            showImage: true,
            showUploadBtn: false
        });
        let { students } = this.state;
        for (let student of students) {
            document.getElementById(student.id).className = '';
        }
    }

    // Get the student of each class .
    CheckClass = (e) => {
        const name = e.target.getAttribute('data-class');
        this.setState({
            selected_class: name
        })
        let arr = []
        this.state.classes.forEach(element => {
            if (element.className === name) {
                element.students.forEach((std) => {
                    arr.push({ id: std.id_number, name: std.firstName + " " + std.lastName })
                })
            }
        });
        this.setState({
            ids: [],
            imgs: [],
            students: arr,
            hidePage: true,
        })
    }

    // Back to the classes page .
    back = () => {
        this.setState({
            hidePage: false
        });
        this.clear();
    }

    setDirectionHistory=()=>{
        this.setState({
            direction: 'history'
        });
    }

    render() {
        let bgColors = ['bg-dark', 'bg-primary', 'bg-info', 'bg-success', 'bg-secondary'];
        let rows = this.state.classes.map((cs) => {
            const num = parseInt(Math.random() * bgColors.length);
            const classNames = `${bgColors[num]} col-md-5 ml-1 class rounded mt-1 text-center text-light cursor`;
            return (
                <div onClick={this.CheckClass} key={cs._id} data-class={cs.className} data-student={cs.students} id={cs._id} className={classNames}>
                    <h1 data-class={cs.className}>{cs.className}</h1>
                    <p data-class={cs.className}>Students : {cs.students.length}</p>
                </div>
            )
        });

        return (

            <>  

                {this.state.direction === 'history' && (<History selected_class={this.state.selected_class}/>)}
                {this.state.direction === 'details' && (<Details/>)}
                {this.state.direction === 'check' &&(<>
                    <div className="container" hidden={!this.state.hidePage}>
                        {/* Spinner when get the result */}
                        <div className="loading" hidden={!this.state.load}>
                            <div className="circle"></div>
                            <div className="circle"></div>
                            <div className="circle"></div>
                            <div className="circle"></div>
                        </div>
                        <div className="d-flex justify-content-end">
                            <button onClick={this.setDirectionHistory} className=" mt4 btn btn-warning shadow grow" >History</button>
                        </div>
                        <div className="row" hidden={this.state.load}>

                            {/* Student table */}

                            <div className="col-md-6">
                                <h3 className="mt-2" style={{ fontFamily: 'Lobster', color: '#343a40' }}>Student of the course</h3>
                                <StudentsTable students={this.state.students} />
                                <div className="d-flex justify-content-around">
                                    <button className="btn btn-dark br4 grow shadow dim">All Students</button>
                                    <button className="btn btn-success br4 grow shadow dim">Attendance Students</button>
                                    <button className="btn btn-danger  br4 grow shadow dim">Absence Students</button>
                                </div>
                            </div>
                            {/* Face recognition */}
                            <div className="col-md-6 align-self-center">
                                <img className="mt-2" onClick={this.back} src="https://img.icons8.com/fluent/48/000000/circled-left.png" alt="go back" />
                                <Button hidden={this.state.showUploadBtn} onClick={this.setShowBtn} style={{ width: '100%' }} className="btn f3 grow btn-dark btn-submit mt-4">Check Attendence</Button>
                                <div hidden={!this.state.showUploadBtn}>
                                    <label htmlFor="file2" style={{ width: '50%', backgroundColor: 'darkcyan' }} className="mt-3 grow f4 btn text-light btn-submit">{(this.state.ids.length === 0) ? 'Check Image' : 'Check another Image'}</label>
                                    <input hidden onChange={this.checkAttendence} type="file" accept="image/*" id="file2" className="form-file mt-4" required disabled={this.state.disableButton} />
                                    <br />
                                    <p hidden={!this.state.showImage} className="mt-5" style={{ fontFamily: 'Acme' }}>To Check Attendence Upload an image for class student , then the system will check it .</p>
                                    <p hidden={!this.state.showImage} style={{ fontFamily: 'Acme' }}><span className="bg-success p-1 text-light rounded">Green</span> rows on table represents the Attendees student , and the <span className="bg-dark p-1 text-light rounded">white</span> rows for Absence students . </p>

                                    {/* Image will display the uploaded image , we use it to draw it on canvas . */}
                                    <img hidden id="person" src={this.state.file} alt="Person" />

                                    {/* Canvas will draw the image , rectangles and names . */}
                                    <canvas id="canvas" width={this.state.width} height={this.state.height} hidden></canvas>

                                    {/* The final result will be shown on the img below , that we can edit it's width and height . */}
                                    <img className="img-thumbnail mt-4" src={this.state.file || noImage} alt="Person" width="300" height='300' hidden={this.state.showImage} />
                                    <br />
                                    <Button hidden={this.state.showImage} onClick={this.clear} style={{ width: '30%' }} className="btn f3 grow btn-warning btn-submit mt-4">Clear</Button>
                                    <a className="btn f3 grow btn-info btn-submit mt-4" style={{ width: '30%' }} hidden={this.state.showImage} href={`${this.state.file}`} download>Download</a>
                                    <br />
                                    <Button hidden={this.state.showImage} onClick={this.sendHistoryData} style={{ width: '30%' }} className="btn f3 grow btn-success btn-submit mt-4 mb-4" disabled={!this.state.ids.length}>Done</Button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="container text-center" hidden={this.state.hidePage}>
                        <h1 className="main-title">Select A Class</h1>
                        <div className="row d-flex justify-content-center">
                            {rows}
                        </div>
                    </div>

                </>)}
            </>);
    }
}
export default MyClasses;
