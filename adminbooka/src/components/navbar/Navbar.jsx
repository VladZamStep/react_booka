import React, { useContext } from 'react'
import './navbar.scss'
import { BsSearch, BsListNested } from 'react-icons/bs'
import { TbWorld } from 'react-icons/tb'
import { MdNightlight, MdWbSunny } from 'react-icons/md'
import { BiExitFullscreen, BiMessage } from 'react-icons/bi'
import { IoMdNotificationsOutline } from 'react-icons/io'
import { DarkModeContext } from '../context/darkModeContext'

const Navbar = () => {

    const { darkMode, dispatch } = useContext(DarkModeContext);

    return (
        <div className='navbar'>
            <div className="navbarContainer">
                <div className="item">
                    <TbWorld className='icon' />
                    English
                </div>
                <div className="item">
                    <span className='icon' onClick={() => dispatch({ type: "TOGGLE" })}>
                        {darkMode ? <MdNightlight /> : <MdWbSunny />}
                    </span>
                </div>
                <div className="item">
                    <BsListNested className='icon' />
                </div>
                <div className="item">
                    <img src="http://almode.ru/uploads/posts/2021-12/1639127930_28-almode-ru-p-devushka-v-plate-31.jpg"
                        alt="profilePhoto"
                        className='profilePhoto'
                    />
                </div>
            </div>
        </div>
    )
}

export default Navbar