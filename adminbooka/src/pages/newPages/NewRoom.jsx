import React, { useState } from 'react'
import Navbar from '../../components/navbar/Navbar'
import Sidebar from '../../components/sidebar/Sidebar'
import './newUser.scss'
import { roomInputs } from '../../formSource'
import useFetch from '../../components/hooks/useFetch'
import axios from 'axios'

const NewRoom = () => {

    const [info, setInfo] = useState({});
    const [hotelId, setHotelId] = useState(undefined);
    const [rooms, setRooms] = useState([]);
    const { data, loading, error } = useFetch("http://localhost:8800/api/hotels");

    const handleChange = (e) => {
        setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }))
    }

    const handleClick = async (e) => {
        e.preventDefault();
        const roomNumbers = rooms.split(",").map((room) => ({ number: room }));
        console.log(roomNumbers)
        try {
            await axios.post(`http://localhost:8800/api/rooms/${hotelId}`, { ...info, roomNumbers })
        } catch (err) {
            console.log(err)
        }
    }
    console.log(data)
    return (
        <div className='newPage'>
            <Sidebar />
            <div className="newPageContainer">
                <Navbar />
                <div className="top">
                    <h1 className="addNew">Add new room</h1>
                </div>
                <div className="bottom">
                    <div className="right">
                        <form>
                            {roomInputs.map((input) => (
                                <div className="formInput" key={input.id}>
                                    <label>{input.label}</label>
                                    <input
                                        id={input.id}
                                        type={input.type}
                                        placeholder={input.placeholder}
                                        onChange={handleChange}
                                    />
                                </div>
                            ))}
                            <div className="formInput">
                                <label>Rooms</label>
                                <textarea
                                    placeholder='Give comma between room numbers'
                                    onChange={(e) => setRooms(e.target.value)}
                                />
                            </div>
                            <div className="formInput">
                                <label>Choose a hotel</label>
                                <select id="hotelId" onChange={(e) => setHotelId(e.target.value)}>
                                    {loading ? "loading" : data && data.map(hotel => (
                                        <option
                                            key={hotel._id}
                                            value={hotel._id}
                                        >
                                            {hotel.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <button className="sendBtn" onClick={handleClick}>Send</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NewRoom