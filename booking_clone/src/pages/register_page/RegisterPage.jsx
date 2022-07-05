import axios from 'axios'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ImFolderUpload } from 'react-icons/im'
import { userInputs } from '../../registerSource'
import './registerPage.css'

const RegisterPage = () => {

    const [file, setFile] = useState("");
    const [info, setInfo] = useState({});
    const navigate = useNavigate();

    const handleChange = (e) => {
        setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }))
    }

    const handleClick = async (e) => {
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
            navigate("/login")
        } catch (err) {
            console.log(err)
        }
    }
    console.log(info)
    return (
        <div className='registerPage'>
            <img src="https://www.tripsavvy.com/thmb/9UCe7bHm9MK9s_UO1nr_FcN-bKE=/5095x3383/filters:fill(auto,1)/usa--oregon--bend--illuminated-tent-by-lake-in-mountains-sb10070057l-001-5c3f91f746e0fb00012b9a84.jpg" alt="" />
            <div className="registerContainer">
                <form>
                    <img
                        src={file
                            ? URL.createObjectURL(file)
                            : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"}
                        alt=""
                    />
                    <div className="registerInput">
                        <label className="imageLabel" htmlFor='file'>
                            Image: <ImFolderUpload className="icon" />
                        </label>
                        <input
                            type="file"
                            id='file'
                            onChange={e => setFile(e.target.files[0])}
                            style={{ display: "none" }} />
                    </div>
                    {userInputs.map((input) => (
                        <div className="registerInput" key={input.id}>
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
                <button className="submitBtn" onClick={handleClick}>Register</button>
            </div>
        </div>
    )
}
export default RegisterPage