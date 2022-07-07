import { useContext } from 'react'
import { BsListNested } from 'react-icons/bs'
import { TbWorld } from 'react-icons/tb'
import { MdNightlight, MdWbSunny } from 'react-icons/md'
import { DarkModeContext } from '../context/darkModeContext'
import { AuthContext } from '../context/AuthContext'
import './navbar.scss'

const Navbar = () => {

    const defaultNoPhoto = "https://i.pinimg.com/280x280_RS/2e/45/66/2e4566fd829bcf9eb11ccdb5f252b02f.jpg";
    const { user } = useContext(AuthContext);
    const { darkMode, dispatch } = useContext(DarkModeContext);

    console.log(user)

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
                    <img src={user.img ? user.img : defaultNoPhoto}
                        alt="profilePhoto"
                        className='profilePhoto'
                    />
                </div>
            </div>
        </div>
    )
}

export default Navbar