import React, { Component } from 'react';
import '../css/home.css';
import Zoom from 'react-reveal/Zoom';
import Bounce from 'react-reveal/Bounce';
import { Fade, LightSpeed } from 'react-reveal';

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
                            <p>
                                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
                            </p>
                            <img className="home-imgs" src={require('../img/why.svg')} />
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
                        <div className="team">
                            <h1>OUR TEAM</h1>
                            <LightSpeed left cascade>
                                <div className="goals">
                                    <div className="team-img"></div>
                                    <div className="team-img"></div>
                                    <p className="team-desc">
                                        <b>Team Leader : </b>MHD Saad Eddin<br/>
                                    </p>
                                </div>
                            </LightSpeed>
                        </div>
                    </Fade>
                    <div className="new-line"></div>
                </div>
            </>
        )
    }
}
export default Home;