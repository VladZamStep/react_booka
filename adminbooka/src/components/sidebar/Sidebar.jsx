import { useContext } from 'react'
import { MdOutlineLocalHotel, MdOutlineMeetingRoom, MdComputer, MdLogout } from 'react-icons/md'
import { FaRegUser } from 'react-icons/fa'
import { GiBrain } from 'react-icons/gi'
import { FiSettings } from 'react-icons/fi'
import { CgProfile } from 'react-icons/cg'
import { Link, useNavigate } from 'react-router-dom'
import { DarkModeContext } from '../context/darkModeContext'
import './sidebar.scss'

const Sidebar = () => {

    const { dispatch } = useContext(DarkModeContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("user");
        navigate('/login');
    }

    return (
        <div className='sidebar'>
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
                    <Link to='/profile'>
                        <li>
                            <CgProfile className='icon' />
                            <span>Profile</span>
                        </li>
                    </Link>
                    <li onClick={handleLogout}>
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