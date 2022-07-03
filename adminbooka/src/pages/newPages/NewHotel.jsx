import React, { useState } from 'react'
import Navbar from '../../components/navbar/Navbar'
import Sidebar from '../../components/sidebar/Sidebar'
import './newUser.scss'
import { ImFolderUpload } from 'react-icons/im'
import { hotelInputs } from '../../formSource'
import useFetch from '../../components/hooks/useFetch'
import axios from 'axios'

const NewHotel = () => {

    const [files, setFiles] = useState("");
    const [info, setInfo] = useState({});
    const [rooms, setRooms] = useState();
    const { data, loading, error } = useFetch("http://localhost:8800/api/rooms");

    const handleChange = (e) => {
        setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }))
    }

    const handleSelect = (e) => {
        const value = Array.from(e.target.selectedOptions, (option) => option.value);
        setRooms(value)
    }
    console.log(files)
    const handleClick = async (e) => {
        e.preventDefault();
        try {
            const allFiles = await Promise.all(
                Object.values(files).map(async (file) => {
                    const data = new FormData();
                    data.append("file", file);
                    data.append("upload_preset", "uploadZam");
                    const uploadRes = await axios
                        .post("https://api.cloudinary.com/v1_1/zamnoise/image/upload", data);

                    const { url } = uploadRes.data;
                    return url;
                }));
            const newHotel = {
                ...info,
                rooms,
                photos: allFiles,
            }
            await axios.post("http://localhost:8800/api/hotels", newHotel);
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <div className='newPage'>
            <Sidebar />
            <div className="newPageContainer">
                <Navbar />
                <div className="top">
                    <h1 className="addNew">Add new hotel</h1>
                </div>
                <div className="bottom">
                    <div className="left">
                        <img
                            src={files
                                ? URL.createObjectURL(files[0])
                                : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"}
                            alt=""
                        />
                    </div>
                    <div className="right">
                        <form>
                            <div className="formInput">
                                <label htmlFor='file'>
                                    Image: <ImFolderUpload className="icon" />
                                </label>
                                <input
                                    type="file"
                                    id='file'
                                    multiple
                                    onChange={e => setFiles(e.target.files)}
                                    style={{ display: "none" }} />
                            </div>
                            {hotelInputs.map((input) => (
                                <div className="formInput" key={input.id}>
                                    <label>{input.label}</label>
                                    <input
                                        type={input.type}
                                        placeholder={input.placeholder}
                                        id={input.id}
                                        onChange={handleChange}
                                    />
                                </div>
                            ))}
                            <div className="formInput">
                                <label>Featured</label>
                                <select id="featured" onChange={handleChange}>
                                    <option value={false}>No</option>
                                    <option value={true}>Yes</option>
                                </select>
                            </div>
                            <div className="selectRooms">
                                <label>Rooms</label>
                                <select id="rooms" multiple onChange={handleSelect}>
                                    {loading ? "loading" : data && data.map(room => (
                                        <option
                                            key={room._id}
                                            value={room._id}
                                        >
                                            {room.title}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <button onClick={handleClick} className="sendBtn">Send</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NewHotel