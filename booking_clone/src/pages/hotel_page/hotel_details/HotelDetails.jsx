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
                    <p className="hotelDesc">
                        {/* Located a 5-minute walk from St. Florian's Gate in Krakow, Tower
                    Street Apartments has accommodations with air conditioning and
                    free WiFi. The units come with hardwood floors and feature a
                    fully equipped kitchenette with a microwave, a flat-screen TV,
                    and a private bathroom with shower and a hairdryer. A fridge is
                    also offered, as well as an electric tea pot and a coffee
                    machine. Popular points of interest near the apartment include
                    Cloth Hall, Main Market Square and Town Hall Tower. The nearest
                    airport is John Paul II International Kraków–Balice, 16.1 km
                    from Tower Street Apartments, and the property offers a paid
                    airport shuttle service. */}
                        {props.description}
                    </p>
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