import React, { useContext } from 'react'
import './sidebar.scss'
import { MdOutlineLocalHotel, MdOutlineMeetingRoom, MdComputer, MdLogout } from 'react-icons/md'
import { FaRegUser, FaCreditCard } from 'react-icons/fa'
import { TbTruckDelivery } from 'react-icons/tb'
import { IoStatsChartSharp } from 'react-icons/io5'
import { IoMdNotificationsOutline } from 'react-icons/io'
import { GiBrain, GiFamilyHouse } from 'react-icons/gi'
import { RiHotelLine } from 'react-icons/ri'
import { FiSettings } from 'react-icons/fi'
import { CgProfile } from 'react-icons/cg'
import { Link } from 'react-router-dom'
import { DarkModeContext } from '../context/darkModeContext'

const Sidebar = () => {

    const { dispatch } = useContext(DarkModeContext);

    return (
        <div className='sidebar'>
            <div className="top">
                <Link to='/'>
                    <span className="logo">Booka_Admin</span>
                </Link>
            </div>
            <div className="center">
                <ul>
                    <p className="title">MAIN</p>
                    <Link to='/users'>
                        <li>
                            <FaRegUser className='icon' />
                            <span>Users</span>
                        </li>
                    </Link>
                    <Link to='/hotels'>
                        <li>
                            <MdOutlineLocalHotel className='icon' />
                            <span>Hotels</span>
                        </li>
                    </Link>
                    <Link to='/rooms'>
                        <li>
                            <MdOutlineMeetingRoom className='icon' />
                            <span>Rooms</span>
                        </li>
                    </Link>
                    <p className="title">USER</p>
                    <li>
                        <CgProfile className='icon' />
                        <span>Profile</span>
                    </li>
                    <li>
                        <MdLogout className='icon' />
                        <span>Logout</span>
                    </li>
                    <p className="title">SERVICE</p>
                    <li className="unavailable">
                        <MdComputer className='icon unavailable' />
                        <span className='unavailable'>System Health</span>
                    </li>
                    <li className="unavailable">
                        <GiBrain className='icon unavailable' />
                        <span className='unavailable'>Logs</span>
                    </li>
                    <li className="unavailable">
                        <FiSettings className='icon unavailable' />
                        <span className='unavailable'>Settings</span>
                    </li>
                </ul>
            </div>
            <div className="bottom">
                <p className="title">MODE</p>
                <div className="colorContainer">
                    <div className="colorOption"
                        onClick={() => dispatch({ type: "LIGHT" })}></div>
                    <div className="colorOption"
                        onClick={() => dispatch({ type: "DARK" })}></div>
                </div>
            </div>
        </div>
    )
}

export default Sidebar