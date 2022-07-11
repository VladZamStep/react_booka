import axios from 'axios'
import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ImFolderUpload } from 'react-icons/im'
import { userInputs } from '../../registerSource'
import './registerPage.scss'
import { BsCheck, BsInfoCircle } from 'react-icons/bs'
import { MdClose } from 'react-icons/md'

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const defaultNoPhoto = "https://i.pinimg.com/280x280_RS/2e/45/66/2e4566fd829bcf9eb11ccdb5f252b02f.jpg";

const RegisterPage = () => {

    const [file, setFile] = useState("");
    const [info, setInfo] = useState({});
    const navigate = useNavigate();

    const [user, setUser] = useState('');
    const [validName, setValidName] = useState(false);
    const [userFocus, setUserFocus] = useState(false);

    const [pwd, setPwd] = useState('');
    const [validPwd, setValidPwd] = useState(false);
    const [pwdFocus, setPwdFocus] = useState(false);

    const [matchPwd, setMatchPwd] = useState('');
    const [validMatch, setValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);

    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    // useEffect(() => {
    //     userRef.current.focus();
    // }, [])

    useEffect(() => {
        setValidName(USER_REGEX.test(user));
    }, [user])

    useEffect(() => {
        setValidPwd(PWD_REGEX.test(pwd));
        setValidMatch(pwd === matchPwd);
    }, [pwd, matchPwd])

    useEffect(() => {
        setErrMsg('');
    }, [user, pwd, matchPwd])

    const handleChange = (e) => {
        setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }))
    }

    const handleClick = async (e) => {
        e.preventDefault();
        const data = new FormData();
        data.append("file", file ? file : defaultNoPhoto);
        data.append("upload_preset", "uploadZam");
        try {
            const uploadRes = await axios.post("https://api.cloudinary.com/v1_1/zamnoise/image/upload", data)

            const { url } = uploadRes.data;
            const newUser = {
                username: user,
                ...info,
                img: url,
            };
            await axios.post("http://localhost:8800/api/auth/register", newUser);
            navigate("/login")
        } catch (err) {
            console.log(err)
        }
    }
    console.log(info, user)
    return (
        <div className='registerPage'>
            <img
                className='backgroundImg'
                src="https://www.tripsavvy.com/thmb/9UCe7bHm9MK9s_UO1nr_FcN-bKE=/5095x3383/filters:fill(auto,1)/usa--oregon--bend--illuminated-tent-by-lake-in-mountains-sb10070057l-001-5c3f91f746e0fb00012b9a84.jpg" alt="" />
            <div className="registerContainer">
                <form>
                    <img
                        className='profileImg'
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
                    <div className="registerInput">
                        <label htmlFor="username">
                            <div className="labelBox">
                                Username:
                                <BsCheck className={validName ? 'valid' : 'hide'} />
                                <MdClose className={validName || !user ? "hide" : "invalid"} />
                            </div>
                        </label>
                        <input
                            type="text"
                            id="username"
                            autoComplete="off"
                            onChange={(e) => setUser(e.target.value)}
                            value={user}
                            required
                            aria-invalid={validName ? "false" : "true"}
                            onFocus={() => setUserFocus(true)}
                            onBlur={() => setUserFocus(false)}
                        />
                        <p id="uidnote" className={userFocus && user && !validName ? "instructions" : "offscreen"}>
                            <div className='infoInstructions'>
                                <BsInfoCircle />
                                Must begin with a letter.
                            </div>
                            4 to 24 characters.<br />
                            Letters, numbers, underscores, hyphens allowed.
                        </p>
                    </div>








                    {userInputs.map((input) => (
                        <div className="registerInput" key={input.id}>
                            <div className="labelBox">
                                <label htmlFor={input.htmlForOpt}>{input.label}</label>
                            </div>
                            <input
                                onChange={handleChange}
                                type={input.type}
                                placeholder={input.placeholder}
                                id={input.id}
                            />
                        </div>
                    ))}
                </form>
                <div className="btns">
                    <button className="submitBtn" onClick={() => navigate('/')}>Back</button>
                    <button className="submitBtn" onClick={handleClick}>Register</button>
                </div>
            </div>
        </div>
    )
}
export default RegisterPage