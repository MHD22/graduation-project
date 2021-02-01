import React, { Component } from 'react';
import '../css/home.css';
import { Fade, Roll, Bounce, Zoom } from 'react-reveal';

class Home extends Component {

    componentDidMount() {
    }
    render() {
        return (
            <>
                <div id="trigger1" className="main-div">

                    <Zoom>
                        <div className="abstract">
                            <h1>Who WE ARE ?</h1>
                            <p>
                                <span>Faceify</span> may provide some interesting services which are related to the face recognition mechanism, like(take attendance of students, detect the strangers in a company, counting the presence people, ...etc.)
                            </p>
                            <img className="home-imgs" src={require('../img/who.svg')} alt="Abstract" />
                        </div>
                    </Zoom>
                    <div className="new-line"></div>

                    <Fade right >
                        <div className="whyus">
                            <h1>WHY US?</h1>
                            <Roll left>
                                <div className="img-text">
                                    <img className="home-imgs why" src={require('../img/time.svg')} alt="Save time" />
                                    <p className="mt-2">
                                        We save your time
                                    </p>
                                </div>
                                <br />
                                <div className="img-text">
                                    <img className="home-imgs why" src={require('../img/free.svg')} alt="Free services" />
                                    <p className="mt-2">
                                        All services are free
                                    </p>
                                </div>

                                <div className="img-text mt-4">
                                    <img className="why" src={require('../img/secure.svg')} alt="Security" />
                                    <p className="mt-2">
                                        Full secure data
                                    </p>
                                </div>
                            </Roll>
                        </div>
                    </Fade>

                    <div className="new-line"></div>
                    <Fade left big>
                        <div className="goals">
                            <h1>OUR GOALS</h1>
                            <Bounce left cascade>
                                <div class="goals">
                                    <p>Facilitate the process of taking attendance.</p>
                                    <p>Make it easy for teacher to review the history of class.</p>
                                    <p>Make the taking attendance process reliable.</p>
                                    <p>Reduce the time needed to take the attendance.</p>
                                </div>
                            </Bounce>
                            <img className="home-imgs" src={require('../img/goal.svg')} alt="Goals" />
                        </div>
                    </Fade>
                    <div className="new-line"></div>

                    <Fade left big>
                        <div className="container">
                            <h1>OUR TEAM</h1>
                            <div className="team">
                                <div className="team-img">
                                    <div className="team-social">
                                        <a className="social-fb" target="_blank" href="https://www.facebook.com/mohammad.sadaldeen"><i className="fab fa-facebook-f"></i></a>
                                        <a className="social-li" target="_blank" href="https://www.linkedin.com/in/mohamad-saad-eddin/"><i className="fab fa-linkedin-in"></i></a>
                                        <a className="social-in" target="_blank" href="https://www.instagram.com/mohamad_saad_eddin/"><i className="fab fa-instagram"></i></a>
                                        <a className="social-in" target="_blank" href="https://github.com/MHD22"><i className="fab fa-github"></i></a>
                                    </div>
                                </div>
                                <div className="team-content">
                                    <h2>Mhd Saad Eddin</h2>
                                    <h3>Full Stack Developer</h3>
                                </div>
                            </div>
                            <div className="team">
                                <div className="team-img2">
                                    <div className="team-social">
                                        <a className="social-fb" target="_blank" href="https://www.facebook.com/mazen.alsmman/"><i className="fab fa-facebook-f"></i></a>
                                        <a className="social-li" target="_blank" href="https://www.linkedin.com/in/mhd-mazen-al-samman-03981119a/"><i className="fab fa-linkedin-in"></i></a>
                                        <a className="social-in" target="_blank" href="https://www.instagram.com/mohammad.mazen.sy/"><i className="fab fa-instagram"></i></a>
                                        <a className="social-in" target="_blank" href="https://github.com/Mazen-Al-Samman"><i className="fab fa-github"></i></a>
                                    </div>
                                </div>
                                <div className="team-content">
                                    <h2>Mazen Al Samman</h2>
                                    <h3>Full Stack Developer</h3>
                                </div>
                            </div>
                        </div>
                    </Fade>
                </div>
            </>
        )
    }
}
export default Home;