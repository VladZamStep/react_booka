import './hotelPage.scss'
import NavBar from '../../components/navbar/NavBar'
import Header from '../../components/header/Header'
import MailList from '../../components/mailList/MailList'
import Footer from '../../components/footer/Footer'
import HotelDetails from './hotel_details/HotelDetails'
import { FaMapMarkerAlt } from 'react-icons/fa'
import { MdArrowLeft, MdArrowRight, MdClose } from 'react-icons/md'
import { useState } from 'react'
import useFetch from '../../hooks/useFetch'
import { useLocation } from 'react-router-dom'
import { useContext } from 'react'
import { SearchContext } from '../../context/SearchContext'

const HotelPage = () => {

    const location = useLocation();
    console.log(location);
    const id = location.pathname.split("/")[2];
    const loadingMessage = "Loading...";
    const { data, loading, error, reFetch } = useFetch(`http://localhost:8800/api/hotels/find/${id}`)

    const { dates, options } = useContext(SearchContext);

    const MILLISEC_PER_DAY = 1000 * 60 * 60 * 24;
    const dayDifference = (date1, date2) => {
        const timeDifference = Math.abs(Date.parse(date2) - Date.parse(date1));
        const diffDays = Math.ceil(timeDifference / MILLISEC_PER_DAY);
        return diffDays;
    }
    const days = (dayDifference(dates[0].endDate, dates[0].startDate));

    const [current, setCurrent] = useState(0)
    const length = data.photos?.length;
    const [open, setOpen] = useState(false);

    const handleOpen = (i) => {
        setOpen(true);
        setCurrent(i);
    }

    const handleMove = (direction) => {
        let newIndex;
        if (direction === 'left') {
            newIndex = current === 0 ? length - 1 : current - 1;

        }
        else if (direction === 'right') {
            newIndex = current === length - 1 ? 0 : current + 1;
        }
        else return;
        setCurrent(newIndex);
    }

    const moveDot = index => {
        setCurrent(index - 1)
    }

    return (
        <div>
            <NavBar />
            <Header type="list" />
            {loading ? loadingMessage :
                (
                    <div className="hotelContainer">
                        {open && <div className="slider">
                            <MdArrowLeft className='arrowL' onClick={() => { handleMove('left') }} />
                            <div className="sliderWrapper">
                                <img className='sliderImg' src={data.photos[current]} alt="" />
                            </div>
                            <MdArrowRight className='arrowR' onClick={() => { handleMove('right') }} />
                            <MdClose className='close' onClick={() => setOpen(false)} />
                            <div className="container-dots">
                                {Array.from({ length: length }).map((item, index) => (
                                    <div
                                        key={index}
                                        onClick={() => moveDot(index + 1)}
                                        className={current === index ? "dot active" : "dot"}
                                    ></div>
                                ))}
                            </div>
                        </div>}
                        <div className="hotelWrapper">
                            <h1 className="hotelTitle">{data.name}</h1>
                            <div className="hotelAddress">
                                <FaMapMarkerAlt />
                                <span>{data.address}</span>
                            </div>
                            <span className="hotelDistance">
                                Excellent location - {data.distance}m from center
                            </span>
                            <span className="hotelPriceBonus">
                                Book a stay over ${data.cheapestPrice} at this property and get a free airport taxi
                            </span>
                            <div className="hotelImages">
                                {data.photos?.map((photo, index) => (
                                    <img
                                        key={index}
                                        onClick={() => handleOpen(index)}
                                        className='hotelImg' src={photo} alt="" />
                                ))
                                }
                            </div>
                            <HotelDetails
                                title={data.title}
                                description={data.description}
                                days={days}
                                rating={data.rating}
                                cheapestPrice={data.cheapestPrice}
                                id={id}
                            />
                        </div>
                        <MailList />
                        <Footer />
                    </div>)}
        </div>
    )
}

export default HotelPage