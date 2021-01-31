import React, { Component } from 'react';
import './home.css';
import Zoom from 'react-reveal/Zoom';
import { Fade } from 'react-reveal';

class Home extends Component {

    componentDidMount() {



    }
    render() {
        return (
            <>
                        <div id="trigger1" className="main-div">

                            <Zoom>

                                <div data-aos="fade-right" className="abstract">
                                    <h1>Who we are? </h1>
                                    <p>
                                        <span>Faceify</span> may provide some interesting services which are related to the <span>face recognition</span> mechanism, like(take attendance of students, detect the strangers in a company, counting the presence people, ...etc.)
                        </p>
                                    <img className="home-imgs" src={require('../img/about-us.png')} alt="Abstract" />
                                    <div className="my-line"></div>
                                </div>
                            </Zoom>
                            <Fade right >
                                <div data-aos="fade-left" className="abstract">
                                    <h1>Why us?</h1>
                                    <p>
                                        <svg id="Capa_1" enable-background="new 0 0 512.022 512.022" height="200" viewBox="0 0 512.022 512.022" width="200" xmlns="http://www.w3.org/2000/svg"><g><path d="m487.54 243.432c-10.503-10.504-24.468-16.359-39.321-16.489-.169-.001-.335-.002-.503-.002-14.667 0-28.536 5.601-39.101 15.802l-64.796 62.569h-14.792c-6.191-17.539-22.936-30.141-42.567-30.141h-56.33c-33.539-28.858-84.312-27.447-116.168 4.226l-113.962 107.019 106.254 106.254 73.857-67.006 170.699-.001 161.212-157.749zm-148.884 152.231-170.125.001-61.27 55.586-64.158-64.156 91.557-85.979c23.746-23.772 61.752-20.695 83.386 4.058h68.413c8.34 0 15.125 6.785 15.125 15.125v15.125h-105.5v30h135.5v-30.109h24.355l73.515-70.989c10.251-9.9 26.793-9.758 36.872.322l3.241 3.241c-38.241 37.847-112.229 109.655-130.911 127.775z" /><path d="m304.317 242.867c61.623 0 111.758-50.135 111.758-111.758s-50.135-111.757-111.758-111.757-111.757 50.134-111.757 111.757 50.134 111.758 111.757 111.758zm0-193.515c45.081 0 81.758 36.676 81.758 81.757s-36.677 81.758-81.758 81.758-81.757-36.677-81.757-81.758 36.676-81.757 81.757-81.757z" /><path d="m344.934 122.499h-25.617v-40.96h-30v70.96h55.617z" /></g></svg>

                                    </p>
                                    <img className="home-imgs" src={require('../img/background.png')} alt="Background" />
                                    <div className="my-line"></div>

                                </div>

                            </Fade>

                            <Fade left big>
                                <div data-aos="fade-left"
                                    data-aos-anchor-placement="top-top" >
                                    <h1>OUR OBJECTIVES</h1>

                                    <Zoom top cascade>
                                        <div>
                                            <h3>Facilitate the process of taking attendance.</h3>
                                            <h3>Make the taking attendance process reliable.</h3>
                                            <h3>Reduce the time needed to take the attendance.</h3>
                                            <h3>Make it easy for teacher to review the history of class.</h3>
                                        </div>
                                    </Zoom>

                                    <img className="home-imgs" src={require('../img/goal.png')} alt="Goals" />
                                    <div className="my-line"></div>
                                </div>

                            </Fade>
                            <div className="testBack"></div>


                        </div>
                

            </>
        )

    }
}
export default Home;