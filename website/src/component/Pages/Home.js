import React, { Component} from 'react';
import Header from '../Common/Header';
import image from '../assets/img/header.jpg';

//Re-usable components

import Services from '../Common/Services';
import Portfolio from '../Common/Portfolio';
import Contact from '../Common/Contact';
import Team from '../Common/Team';
import Clients from '../Common/Clients'
//import About from '../Pages/About';


class Home extends Component {
    render() {
        return (
            /*<div>
                <header className="masthead">
                <div className="container">
                <div className="masthead-subheading">Welcome To Our Studio!</div>
                <div className="masthead-heading text-uppercase">It's Nice To Meet You</div>
                <a className="btn btn-primary btn-xl text-uppercase js-scroll-trigger" href="#services">Tell Me More</a>
                 </div>
                </header>
            </div>*/

            <div>
                <Header 
                    title="Welcome to Our Studio!"
                    subtitle="IT'S NICE TO MEET YOU"
                    buttonText="Tell me more"
                    link="/services"
                    showButton={true}
                    image= {image} 
                />

                <Services />
                <Portfolio />
                {/*<About />*/}
                <Team />
                <Clients />
                <Contact />
            </div>
        )
    }
}

export default Home;