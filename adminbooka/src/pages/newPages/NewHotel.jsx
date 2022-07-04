import React, { useState } from 'react'
import Navbar from '../../components/navbar/Navbar'
import Sidebar from '../../components/sidebar/Sidebar'
import './newPage.scss'
import { ImFolderUpload } from 'react-icons/im'
import { hotelInputs } from '../../formSource'
import axios from 'axios'
import RoomsArea from './newHotelDetails/RoomsArea'
import Featured from './newHotelDetails/Featured'
import FullDescription from './newHotelDetails/FullDescription'
import TypeArea from './newHotelDetails/TypeArea'

const NewHotel = () => {

    const [files, setFiles] = useState("");
    const [info, setInfo] = useState({});
    const [rooms, setRooms] = useState();
    const [types, setHotelTypes] = useState();

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
                types,
                rooms,
                photos: allFiles,
            }
            await axios.post("http://localhost:8800/api/hotels", newHotel);
        } catch (err) {
            console.log(err)
        }
    }
    console.log(info)
    return (
        <div className='newPage'>
            <Sidebar />
            <div className="newPageContainer">
                <Navbar />
                <div className="newPageWrapper">
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
                            </form>
                        </div>
                        <div className="right">
                            <form>
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
                                <div className="selectedOptionWrapper">
                                    <TypeArea handleChange={handleChange} />
                                    <Featured handleSelect={handleSelect} />
                                </div>
                                <FullDescription handleChange={handleChange} />
                                <RoomsArea handleSelect={handleSelect} />
                            </form>
                        </div>
                    </div>
                    <button onClick={handleClick} className="sendBtn">Send</button>
                </div>
            </div>
        </div>
    )
}

export default NewHotel