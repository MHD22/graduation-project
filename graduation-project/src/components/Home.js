import React, { useEffect } from 'react';
import './home.css';
import Aos from 'aos';
import "aos/dist/aos.css";

function Home() {

    useEffect(() => {
        Aos.init({ duration: 2000 })
    }, []);

    return (
        <>
            <div className="main-div">
                <div data-aos="fade-right" className="abstract" data-aos="fade-right">
                    <h1>ABSTRACT</h1>
                    <p>
                        One of the problems that face the teacher in the classroom is when he wants to take attendance especially when a large number of students in the classroom, so and after long thinking, we found a solution that will help teachers to take attendance faster and easier than the traditional way.
                        <br />
                        Our project will handle a platform that helps the teacher to create their classes with the registered student for each class, and the main process of our project is when the teacher wants to take attendance the platform will ask them to upload an image or more for attendants and it will check faces automatically.
                    </p>
                    <img className="home-imgs" src={require('../img/about-us.png')} alt="Abstract" />
                </div>
                <div className="my-line"></div>
                <div data-aos="fade-left" className="background">
                    <h1>BACKGROUND</h1>
                    <p>
                        With technical progress every day, technology has become the best solution of all existing problems, helping to save time for certain tasks and with much better accuracy than the traditional way.
                        <br /><br />
                        <b>ClassImage</b> is software that has been developed to solve one of the most important problems facing teachers in classrooms that when the teacher wants to take attendance in the classroom.
                        <br /><br />
                        It is based on artificial intelligence algorithms that identify the faces in the pictures and distinguish the owner of each face, thus making the process of checking attendance easier and faster.
                    </p>
                    <img className="home-imgs" src={require('../img/background.png')} alt="Background" />
                </div>
                <div className="my-line"></div>
                <div className="objective">
                    <h1>OUR OBJECTIVES</h1>
                    <ol>
                        <li>Facilitate the process of taking attendance from all web site.</li>
                        <li>Make the taking attendance process reliable.</li>
                        <li>Reduce the time needed to take attendance.</li>
                        <li>Make it easy for teacher to review the history of class.</li>
                    </ol>
                    <img className="home-imgs" src={require('../img/goal.png')} alt="Goals" />
                </div>
            </div>
        </>
    )
}
export default Home;