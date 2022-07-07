import './hotelDetails.css'
import { useContext, useState } from 'react';
import { SearchContext } from '../../../context/SearchContext';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../context/AuthContext';
import ChooseRoom from '../../../components/chooseRoom/ChooseRoom';
const HotelDetails = (props) => {

    const navigate = useNavigate();
    const [openModal, setOpenModal] = useState(false);
    const { user } = useContext(AuthContext);
    const { options } = useContext(SearchContext);

    const handleClick = () => {
        if (user) {
            setOpenModal(true);
        }
        else {
            navigate("/login");
        }
    }
    return (
        <>
            <div className="hotelDetails">
                <div className="hotelDetTexts">
                    <h1 className="hotelTitle">{props.title}</h1>
                    <p className="hotelDesc">{props.description}</p>
                </div>
                <div className="hotelPrice">
                    <h1>Perfect for a {props.days}-night stay!</h1>
                    <span>
                        Located in the real heart of Krakow, this property has an
                        excellent location score of 9.8!
                    </span>
                    <h2><b>${props.days * props.cheapestPrice * options.rooms}</b> ({props.days} nights)</h2>
                    <button onClick={handleClick}>Reserve or Book Now!</button>
                </div>
            </div>
            {openModal && <ChooseRoom setOpen={setOpenModal} hotelId={props.id} />}
        </>
    )
}

export default HotelDetails