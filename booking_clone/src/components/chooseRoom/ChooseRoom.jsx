import React, { useState } from 'react'
import './chooseRoom.css'
import { MdClose } from 'react-icons/md'
import useFetch from '../../hooks/useFetch'
import { useContext } from 'react'
import { SearchContext } from '../../context/SearchContext'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const ChooseRoom = ({ setOpen, hotelId }) => {

    const [selected, setSelected] = useState([]);
    const navigate = useNavigate();

    const loadingMessage = "Loading...";
    const { data, loading, error, reFetch } = useFetch(`http://localhost:8800/api/hotels/room/${hotelId}`)

    const { dates } = useContext(SearchContext);

    const getDatesInRange = (startDate, endDate) => {
        const start = new Date(startDate);
        const end = new Date(endDate);
        const date = new Date(start.getTime());

        let list = []

        while (date <= end) {
            list.push(new Date(date).getTime())
            date.setDate(date.getDate() + 1)
        }
        return list
    }
    const allDates = getDatesInRange(dates[0].startDate, dates[0].endDate);

    const isAvailable = (roomNumber) => {
        const isFound = roomNumber.unavailableDates.some((date) =>
            allDates.includes(new Date(date).getTime())
        );
        return !isFound;
    }

    const handleSelect = (e) => {
        const checked = e.target.checked;
        const value = e.target.value;
        setSelected(checked ? [...selected, value] : selected.filter((item) => item !== value))
    }

    const handleClick = async () => {
        try {
            await Promise.all(
                selected.map((roomId) => {
                    const res = axios.put(`http://localhost:8800/api/rooms/availability/${roomId}`,
                        {
                            dates: allDates,
                        });
                    return res.data;
                })
            );
            setOpen(false);
            navigate("/");
        } catch (err) {
            console.log(err);
        }
    };
    return (
        <div className="chooseRoom">
            <div className="chooseRoomContainer">
                <MdClose className='closeCR' onClick={() => setOpen(false)} />
                <span className="selectRooms">Select your rooms:</span>
                {data.map((item) => (
                    <div className="cRItem" key={item._id}>
                        <div className="cRItemInfo">
                            <div className="cRTitle">{item.title}</div>
                            <div className="cRDescription">{item.description}</div>
                            <div className="cRMaxPeople">Max people: <b>{item.maxPeople}</b>
                            </div>
                            <div className="cRPrice">${item.price}</div>
                        </div>
                        <div className="checkBoxRooms">
                            {item.roomNumbers.map((roomNumber) => (
                                <div className="room" key={roomNumber._id}>
                                    <label>{roomNumber.number}</label>
                                    <input
                                        type="checkbox"
                                        value={roomNumber._id}
                                        onChange={handleSelect}
                                        disabled={!isAvailable(roomNumber)}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
                <button className="reserveBtn" onClick={handleClick}>Reserve now!</button>
            </div>
        </div>
    )
}

export default ChooseRoom