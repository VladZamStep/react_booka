import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../../components/navbar/Navbar'
import Sidebar from '../../components/sidebar/Sidebar'
import { AuthContext } from '../context/AuthContext'
import './mainProfile.scss'

const MainProfile = () => {
    const defaultNoPhoto = "https://i.pinimg.com/280x280_RS/2e/45/66/2e4566fd829bcf9eb11ccdb5f252b02f.jpg";
    const noInfo = "no information";

    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleBack = () => {
        navigate("/")
    }

    console.log(user)
    return (
        <div className='mainPage'>
            <Navbar />
            <div className="mainContainer">
                <Sidebar />
                <div className="mainWrapper">
                    <div className="mainItems">
                        <div className="editBtn">Edit</div>
                        <h1 className="infoTitle">Information</h1>
                        <div className="item">
                            <div className="photosInfo">
                                <img src={user.img || defaultNoPhoto}
                                    alt=""
                                    className='itemImg'
                                />
                            </div>
                            <div className="details">
                                <h1 className="itemTitle">{user.username}</h1>
                                <div className="delailItem">
                                    <span className="itemKey">Email:</span>
                                    <span className="itemValue">{user.email}</span>
                                </div>
                                <div className="delailItem">
                                    <span className="itemKey">Phone:</span>
                                    <span className="itemValue">{user.phone || noInfo}</span>
                                </div>
                                <div className="delailItem">
                                    <span className="itemKey">Country:</span>
                                    <span className="itemValue">{user.country || noInfo}</span>
                                </div>
                                <div className="delailItem">
                                    <span className="itemKey">City:</span>
                                    <span className="itemValue">{user.city || noInfo}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <button onClick={handleBack} className="sendBtn">Back</button>
                </div>
            </div>
        </ div>
    )
}

export default MainProfile