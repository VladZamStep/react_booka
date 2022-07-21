import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useFetch from '../../../components/hooks/useFetch'
import axios from 'axios'
import Sidebar from '../../../components/sidebar/Sidebar'
import Navbar from '../../../components/navbar/Navbar'
import { roomInputs } from '../../../formSource'
import './newRoom.scss'

const NewRoom = () => {

    const [info, setInfo] = useState({});
    const [hotelId, setHotelId] = useState(undefined);
    const [rooms, setRooms] = useState([]);
    const navigate = useNavigate();

    const { data, loading } = useFetch("http://localhost:8800/api/hotels");

    const handleChange = (e) => {
        setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }))
    }

    const handleSend = async (e) => {
        e.preventDefault();
        const roomNumbers = rooms.split(",").map((room) => ({ number: room }));
        try {
            await axios.post(`http://localhost:8800/api/rooms/${hotelId}`, { ...info, roomNumbers })
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <div className='newRoomPage'>
            <Navbar />
            <div className="newRoomPageContainer">
                <Sidebar />
                <div className="newRoomPageWrapper">
                    <div className="top">
                        <h1 className="addNew">Add new room</h1>
                    </div>
                    <div className="bottom">
                        <div className="bottomWrapper">
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
                                <div className="roomsArea">
                                    <label>Rooms</label>
                                    <textarea
                                        rows="1"
                                        placeholder='101, 102, 103'
                                        onChange={(e) => setRooms(e.target.value)}
                                    />
                                </div>
                                <div className="selectOption">
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
                            </form>
                        </div>
                    </div>
                    <div className="btns">
                        <button className="sendBtn" onClick={() => navigate("/rooms")}>Back</button>
                        <button className="sendBtn" onClick={handleSend}>Send</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NewRoom