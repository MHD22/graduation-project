import { Col, Row } from 'react-bootstrap';
import React, { Component } from 'react';
import noImage from '../noImage.png';
import StudentsTable from './StudentsTable';
import Details from './Details';
import History from './History';
import { storage } from '../firebase/index';
import EditClass from './EditClass';
import { Redirect, Route } from 'react-router-dom';
import '../css/myClasses.css';
import '../css/home.css';

const initialState = {
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
    direction: 'check', // OR history , details , edit
    historyData: {},
    route: null,
    doneDisable: true,
    showStudents: [],
    flag: 0
}
class MyClasses extends Component {
    constructor() {
        super();
        this.state = initialState;
    }

    // Get all the classes for the logged in teacher .
    componentDidMount() {
        if (this.checkLoggedIn()) {
            let baseUrl = document.getElementById('baseUrl').defaultValue;
            fetch(`${baseUrl}/teacherClasses?id=` + JSON.parse(sessionStorage.getItem('teacher')).id_number)
                .then(res => res.json()).then(data => {
                    this.setState({
                        classes: data,

                    })
                })
                .catch(e => console.log(e));
        }
    }
    componentWillUnmount() {
        this.setState({ flag: 0 })
    }
    componentDidUpdate(prevProps, prevState) {
        if (prevState.flag !== 1) {
            if (this.checkLoggedIn()) {
                let baseUrl = document.getElementById('baseUrl').defaultValue;
                fetch(`${baseUrl}/teacherClasses?id=` + JSON.parse(sessionStorage.getItem('teacher')).id_number)
                    .then(res => res.json()).then(data => {
                        this.setState({
                            classes: data,
                            flag: 1

                        })
                    })
                    .catch(e => console.log(e));
            }
        }
    }

    //To Check if LoggedIn .
    checkLoggedIn = () => {
        const data = sessionStorage.getItem('teacher');
        if (!data) {
            this.setState({
                route: '/login'
            })
            return false;
        }
        else {
            return true;
        }
    }

    // Will check the faces from the uploaded image .
    checkAttendence = (e) => {
        this.setState({
            load: true,
            doneDisable: true
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
        let baseUrl = document.getElementById('baseUrl').defaultValue;
        fetch(`${baseUrl}/history/${this.state.selected_class}`, requestOptions)
            .then(res => res.json())
            .then(console.log)
            .catch(e => { console.log("An Error occured while sending history Data ..", e) });
        let date = new Date();
        let fullDate = date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();
        let historyData = {
            students: this.state.ids,
            allStudents: this.state.students,
            imgs: this.state.imgs,
            className: this.state.selected_class,
            date: fullDate
        };
        this.clear();
        this.setState({
            ids: [],
            imgs: [],
            selected_class: [],
            historyData: historyData,
            disableButton: true,
            route: '/show/details',
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


        let baseUrl = document.getElementById('baseUrl').defaultValue;
        fetch(`${baseUrl}/checkImage`, requestOptions)
            .then(response => response.json())
            .then(result => {

                console.log(result);
                //Define canvas to draw rectangle .
                let canvas = document.getElementById('canvas');
                let ctx = canvas.getContext('2d');

                //Canvas properties .
                ctx.strokeStyle = '#fcff04';
                ctx.fillStyle = '#fcff04';
                ctx.lineWidth = '3';

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
                    if (result[i].probability * 100 < 85) {
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
                    let space = parseInt(Dim / 3) + 2,
                        text = `${space}px Carter One`;
                    ctx.font = text;

                    //Draw the rectangle .
                    ctx.strokeRect(left, top, Dim, Dim);

                    //Type the name of person .
                    ctx.fillText(name, left, bottom + space);
                }

                let attendStudents = [];
                let absenceStudents = [];
                for (let i of this.state.students) {
                    let flag = false;
                    for (let j of this.state.ids) {
                        if (i.id === j) {
                            flag = true;
                        }
                    }
                    if (flag) {
                        attendStudents.push({
                            id: i.id,
                            name: i.name
                        });
                    }
                    else {
                        absenceStudents.push({
                            id: i.id,
                            name: i.name
                        });
                    }
                }

                this.setState({
                    ids: ids,
                    attendStudents,
                    absenceStudents
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
            let imageName = "studentsImage" + new Date().getTime();
            const upload = storage.ref(`images/${imageName}`).put(image);
            upload.on('state_changed',
                (snapshot) => { },
                (err) => {
                    console.log("error while getting data from firebase.\n", err);
                    return '';
                },
                () => {
                    storage.ref('images').child(imageName).getDownloadURL().then(urll => {
                        console.log(urll);

                        let imgs = [].concat(this.state.imgs);
                        imgs.push(urll);
                        this.setState({
                            imgs: imgs,
                            doneDisable: false
                        })
                        return urll;
                    })

                })
        }
    }

    // To change the row color according to the attendence .
    colorTable = () => {
        let { ids } = this.state;
        for (let i of ids) {
            let row = document.getElementById(i + "");
            if (row) {
                row.style.backgroundColor = '#178326a2';
            }
        }
    }

    // Clear data from upload image and recolor the table .
    clear = () => {
        this.setState({
            showImage: true,
            showUploadBtn: false,
            ids: [],
            imgs: []
        });
        document.getElementById("file2").value = '';
        let { students } = this.state;
        for (let student of students) {
            let stdRow = document.getElementById(student.id);
            if (stdRow) {
                stdRow.className = '';
            }
        }
    }

    // Get the student of each class .
    CheckClass = (e) => {
        let cName = e.target.getAttribute('data-class');
        console.log(cName);
        let arr = []
        let { classes } = this.state;
        classes.forEach(element => {
            if (element.className === cName) {

                element.students.forEach((std) => {
                    arr.push({ id: std.id_number, name: std.firstName + " " + std.lastName })
                })
            }
        });

        console.log(arr, this.state.classes);


        this.setState({
            ids: [],
            imgs: [],
            students: arr,
            hidePage: true,
            showStudents: arr,
            selected_class: cName,
            route: '/show/classData'
        })
    }

    editClass = () => {
        this.setState({
            direction: 'edit',
            route: '/show/editClass'
        });
    }


    // Back to the classes page .
    back = () => {
        this.setState({
            hidePage: false,
            route: '/show'
        });
        this.clear();
    }

    showHistoryPage = () => {
        this.setState({
            route: '/show/classHistory'
        });
    }

    showAllStudents = () => {
        let showStudents = this.state.students;
        this.setState({
            showStudents
        });
        this.colorTable();
    }

    showAttendStudents = () => {
        let showStudents = this.state.attendStudents;
        this.setState({
            showStudents
        });
    }

    showAbcentStudents = () => {
        let showStudents = this.state.absenceStudents;
        this.setState({
            showStudents
        });
    }

    onChangeRoute = (route, timer) => {
        setTimeout(() => {
            console.log(route, "clicked");
            if (this.checkLoggedIn()) {
                let baseUrl = document.getElementById('baseUrl').defaultValue;
                fetch(`${baseUrl}/teacherClasses?id=` + JSON.parse(sessionStorage.getItem('teacher')).id_number)
                    .then(res => res.json()).then(data => {
                        this.setState({
                            classes: data,
                            route
                        })
                    })
                    .catch(e => console.log(e));
            }
        }, timer);
    }

    render() {
        let { path } = this.props.match;
        let classInfo = {
            'students': this.state.students,
            'className': this.state.selected_class
        };
        let rows = this.state.classes.map((cs) => {
            return (

                <div
                    onClick={this.CheckClass}
                    key={cs._id}
                    data-class={cs.className}
                    data-student={cs.students}
                    id={`class:${cs._id}`}
                    className={`cont-card`}
                >
                    <div data-class={cs.className} className="inner-cont-card  large button card-front">
                        <p data-class={cs.className} >{cs.className}</p>
                        <i data-class={cs.className} className="far fa-paper-plane icons"></i>
                    </div>

                    <div data-class={cs.className} className="panel card-back">

                        <div data-class={cs.className} className="inner-cont-card hub-info">
                            <i data-class={cs.className} className="far mb-3 fa-edit icons"></i>
                            <p data-class={cs.className}>Contains <br /> <span data-class={cs.className} className="number-span">{cs.students.length}</span> <br /> Students</p>
                        </div>

                    </div>
                </div>
            )
        });

        return (
            <>
                {this.state.route ? <Redirect to={this.state.route} /> : null}
                <Route path={`${path}/editClass`} component={() => <EditClass classInfo={classInfo} onChangeRoute={this.onChangeRoute} />} />
                <Route path={`${path}/classHistory`} component={() => <History selected_class={this.state.selected_class} onChangeRoute={this.onChangeRoute} />} />
                <Route path={`${path}/details`} component={() => <Details historyData={this.state.historyData} onChangeRoute={this.onChangeRoute} backToHistory={false} />} />
                <Route path={`${path}`} exact >
                    <div className=" text-center" >

                        <section className="hero-unit">
                            <hgroup>
                                <h2 className="select-class">Select A Class </h2>
                            </hgroup>

                            <div className="flip-cards">
                                {rows}
                            </div>
                        </section>

                    </div>
                </Route>
                <Route path={`${path}/classData`}>
                    <div className="bg--white">
                    </div>
                    <div className="container">

                        <div class="loader" hidden={!this.state.load}>
                            <ul class="hexagon-container">
                                <li class="hexagon hex_1"></li>
                                <li class="hexagon hex_2"></li>
                                <li class="hexagon hex_3"></li>
                                <li class="hexagon hex_4"></li>
                                <li class="hexagon hex_5"></li>
                                <li class="hexagon hex_6"></li>
                                <li class="hexagon hex_7"></li>
                            </ul>
                        </div>

                        {/* buttons ,, top  */}
                        <div className=" d-flex justify-content-between btns" style={{ paddingRight: '12%', paddingLeft: '12%' }}>
                            <button hover-data="Back"
                                onClick={this.back} className="red-btn mt4 ma1 my-button" hidden={this.state.load} >
                                <i className="btn-icon far fa-arrow-alt-circle-left"></i>
                            </button>
                            <h3 hidden={this.state.load} className="mt-5 f2 font-lobster ml-5">{this.state.selected_class}</h3>
                            <div>
                                <button hover-data="Edit Class"
                                    hidden={this.state.load} onClick={this.editClass} className=" mt4 ma1 my-button">
                                    <i className="btn-icon fas fa-users-cog"></i>
                                </button>
                                <button hover-data="Class History"
                                    hidden={this.state.load} onClick={this.showHistoryPage} className=" mt4 ma1 my-button">
                                    <i className="btn-icon fas fa-history"></i>
                                </button>
                            </div>
                        </div>
                        <div className="my-line2" hidden={this.state.load}></div>
                        {/* Face recognition */}
                        <Row hidden={this.state.load}>
                            <Col xs={12}>
                                <button hidden={this.state.showUploadBtn} onClick={this.setShowBtn} className="my-button mt-4">Check Attendence</button>
                                <div hidden={!this.state.showUploadBtn}>

                                    <p hidden={!this.state.showImage} className="mt-5 f3 b i upload-text">Upload one or more image to take the attendance, Then click on <span className='red f3'>'Done'</span> Button.</p>

                                    <label htmlFor="file2" className="mt-3 my-button f4 pointer">{(this.state.ids.length === 0) ? 'Upload An Image ' : 'Upload Another Image '} <i class=" fas fa-cloud-upload-alt"></i>   </label>
                                    <input type="file" hidden onChange={this.checkAttendence} accept="image/*" id="file2" className="form-file mt-4 " required />
                                    <br />

                                    {/* Image will display the uploaded image , we use it to draw it on canvas . */}
                                    <img hidden id="person" src={this.state.file} alt="Person" />

                                    {/* Canvas will draw the image , rectangles and names . */}
                                    <canvas id="canvas" width={this.state.width} height={this.state.height} hidden></canvas>

                                    {/* The final result will be shown on the img below , that we can edit it's width and height . */}
                                    <img className="img-thumbnail mt-4" src={this.state.file || noImage} alt="Person" width="300" height='300' hidden={this.state.showImage} />
                                    <br />

                                    <div className="table-buttons2">
                                        <button hidden={this.state.showImage} onClick={this.clear} className="my-button grow red-btn"><i class="fas fa-trash-alt"></i></button>
                                        <button hidden={this.state.showImage} className="my-button  grow"><a href={`${this.state.file}`} download></a> <i class="fas fa-download"></i> </button>
                                        <button hidden={this.state.showImage} onClick={this.sendHistoryData} disabled={this.state.doneDisable} className="my-button grn-btn grow ">Done</button>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                        <div className="my-line" hidden={this.state.load}></div>
                        {/* Student table */}
                        <Row hidden={this.state.load} className="mt5">
                            <Col xs={12} >
                                <h3 className="mt-2 table-header font-acme">Students enrolled this course</h3>
                                <StudentsTable students={this.state.showStudents} />
                                <div className="table-buttons">
                                    <button onClick={this.showAllStudents} className="my-button grow">All Students</button>
                                    <button onClick={this.showAttendStudents} className="my-button grn-btn grow">Attendance Students</button>
                                    <button onClick={this.showAbcentStudents} className="my-button grow red-btn">Absence Students</button>
                                </div>
                            </Col>
                        </Row>
                    </div>
                </Route>


            </>);
    }
}
export default MyClasses;
