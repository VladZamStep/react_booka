import './navBar.css';
import { Link } from 'react-router-dom';
import { useContext, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';

const NavBar = () => {

    const [show, setShow] = useState(true);
    const { user } = useContext(AuthContext);

    const handleClick = () => {
        localStorage.removeItem("user")
        setShow(false)
    }

    return (
        <div className='navbar'>
            <div className='navContainer'>
                <Link to="/">
                    <span className='logo'>Booka.com</span>
                </Link>
                {user && show
                    ?
                    <>
                        <div className="navItems">
                            <div className="navUserItems">
                                <img className='userImg'
                                    src={user.img || "https://i.pinimg.com/280x280_RS/2e/45/66/2e4566fd829bcf9eb11ccdb5f252b02f.jpg"}
                                />
                                <span className='userName'>{user.username}</span>
                            </div>
                            <button className="navBtn" onClick={handleClick}>Logout</button>
                        </div>
                    </>
                    :
                    <>
                        <div className="navItems">
                            <Link to="/register">
                                <button className="navBtn">Register</button>
                            </Link>
                            <Link to="/login">
                                <button className="navBtn">Login</button>
                            </Link>
                        </div>
                    </>
                }
            </div>
        </div >
    )
}
export default NavBar;