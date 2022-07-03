import React from 'react'
import Sidebar from '../../components/sidebar/Sidebar'
import Navbar from '../../components/navbar/Navbar'
import './homePage.scss'
import Widget from '../../components/widget/Widget'
import OrdinaryChart from '../../components/ordinaryChart/OrdinaryChart'
import FeaturedChart from '../../components/featuredChart/FeaturedChart'
import TableList from '../../components/table/TableList'

const TITLE = "Welcome to Administration Booka.com Page!";
const WELCOME_INFO = "This is the place where you can see, make changes and update users, hotels and rooms. Database used in this project is for educational purposes only. Let’s get started.";

const HomePage = () => {
    return (
        <div className='homePage'>
            <Sidebar />
            <div className="homeContainer">
                <Navbar />
                <div className="welcome">
                    <h1 className="welcomeTitle">{TITLE}</h1>
                    <p className="welcomeInfo">This is the place where you can see, make changes and update users, hotels and rooms.</p>
                    <p className="welcomeInfo">Database used in this project is for educational purposes only.</p>
                    <p className="welcomeInfo">Let’s get started!</p>
                </div>

            </div>
        </div>
    )
}

export default HomePage