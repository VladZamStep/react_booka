import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ImFolderUpload } from 'react-icons/im'
import axios from 'axios'
import './newUser.scss'
import Sidebar from '../../../components/sidebar/Sidebar'
import Navbar from '../../../components/navbar/Navbar'
import { userInputs } from '../../../formSource'

const NewUser = () => {

    const [file, setFile] = useState("");
    const [info, setInfo] = useState({});
    const navigate = useNavigate();

    const handleChange = (e) => {
        setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }))
    }

    const handleSend = async (e) => {
        e.preventDefault();
        const data = new FormData();
        data.append("file", file);
        data.append("upload_preset", "uploadZam");
        try {
            const uploadRes = await axios.post("https://api.cloudinary.com/v1_1/zamnoise/image/upload", data)

            const { url } = uploadRes.data;
            const newUser = {
                ...info,
                img: url,
            };
            await axios.post("http://localhost:8800/api/auth/register", newUser);
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <div className='newUserPage'>
            <Navbar />
            <div className="newUserPageContainer">
                <Sidebar />
                <div className="newUserPageWrapper">
                    <div className="top">
                        <h1 className="addNew">Add new user</h1>
                    </div>
                    <div className="bottom">
                        <div className="left">
                            <img
                                src={file
                                    ? URL.createObjectURL(file)
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
                                        onChange={e => setFile(e.target.files[0])}
                                        style={{ display: "none" }} />
                                </div>
                            </form>
                        </div>
                        <div className="right">
                            <form>
                                {userInputs.map((input) => (
                                    <div className="formInput" key={input.id}>
                                        <label>{input.label}</label>
                                        <input
                                            onChange={handleChange}
                                            type={input.type}
                                            placeholder={input.placeholder}
                                            id={input.id}
                                        />
                                    </div>
                                ))}
                            </form>
                        </div>
                    </div>
                    <div className="btns">
                        <button className="sendBtn" onClick={() => navigate("/users")}>Back</button>
                        <button className="sendBtn" onClick={handleSend}>Send</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NewUser