import './navBar.css';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';

const NavBar = () => {

    const { user } = useContext(AuthContext);

    return (
        <div className='navbar'>
            <div className='navContainer'>
                <Link to="/">
                    <span className='logo'>Booka.com</span>
                </Link>
                {user
                    ?
                    <>
                        <div className="navItems">
                            <span className='userName'>{user.username}</span>
                            <button className="navBtn">Logout</button>
                        </div>
                    </>
                    :
                    <>
                        <div className="navItems">
                            <button className="navBtn">Register</button>
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