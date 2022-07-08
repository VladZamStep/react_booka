import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import useFetch from '../../components/hooks/useFetch'
import Navbar from '../../components/navbar/Navbar'
import Sidebar from '../../components/sidebar/Sidebar'
import './singleUserPage.scss'

const SingleUserPage = () => {
    const defaultNoPhoto = "https://i.pinimg.com/280x280_RS/2e/45/66/2e4566fd829bcf9eb11ccdb5f252b02f.jpg";
    const noInfo = "no information";

    const location = useLocation();
    const navigate = useNavigate();

    const id = location.pathname.split("/")[2]
    const { data } = useFetch(`http://localhost:8800/api/users/${id}`)

    const handleClick = () => {
        navigate("/users")
    }

    return (
        <div className='singleUserPage'>
            <Navbar />
            <div className="singleUserPageContainer">
                <Sidebar />
                <div className="singleUserPageWrapper">
                    <div className="singleUserItems">
                        <div className="editBtn">Edit</div>
                        <h1 className="infoTitle">Information</h1>
                        <div className="item">
                            <div className="photosInfo">
                                <img src={data.img || defaultNoPhoto}
                                    alt=""
                                    className='itemImg'
                                />
                            </div>
                            <div className="details">
                                <h1 className="itemTitle">{data.username}</h1>
                                <div className="delailItem">
                                    <span className="itemKey">Email:</span>
                                    <span className="itemValue">{data.email}</span>
                                </div>
                                <div className="delailItem">
                                    <span className="itemKey">Phone:</span>
                                    <span className="itemValue">{data.phone || noInfo}</span>
                                </div>
                                <div className="delailItem">
                                    <span className="itemKey">Country:</span>
                                    <span className="itemValue">{data.country || noInfo}</span>
                                </div>
                                <div className="delailItem">
                                    <span className="itemKey">City:</span>
                                    <span className="itemValue">{data.city || noInfo}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <button onClick={handleClick} className="sendBtn">Back</button>
                </div>
            </div>
        </ div>
    )
}

export default SingleUserPage