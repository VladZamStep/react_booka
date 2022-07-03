import './header.css';
import './header_components/header_options/headerOptions.css'
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBed, faCalendarDays, faPerson } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DateRange } from 'react-date-range';
import { format } from 'date-fns';
import HeaderList from './header_components/HeaderList';
import { useContext } from 'react';
import { SearchContext } from '../../context/SearchContext';
import { AuthContext } from '../../context/AuthContext';

const Header = ({ type }) => {

    //Hooks
    const [destination, setDestination] = useState('')
    const [openDate, setOpenDate] = useState(false)
    const [dates, setDates] = useState([
        {
            startDate: new Date(),
            endDate: new Date(),
            key: 'selection'
        }
    ]);
    const [openOpt, setOpenOpt] = useState(false)
    const [options, setOptions] = useState(
        {
            adults: 1,
            children: 0,
            rooms: 1
        }
    )
    const navigate = useNavigate();

    //Option's function
    const changeNum = (name, operation) => {
        setOptions((prev) => {
            return {
                ...prev,
                [name]: operation === "increase" ? options[name] + 1 : options[name] - 1,
            }
        });
    };

    //Open and Close Date $ Options
    const changeStateDate = () => {
        if (openOpt === false) {
            setOpenDate(!openDate)
        }
        else {
            setOpenOpt(!openOpt);
            setOpenDate(!openDate)
        }
    }
    const changeStateOpt = () => {
        if (openDate === false) {
            setOpenOpt(!openOpt)
        }
        else {
            setOpenDate(!openDate);
            setOpenOpt(!openOpt);
        }
    }
    const closeDateOpt = () => {
        if (openDate) setOpenDate(!openDate);
        else if (openOpt) setOpenOpt(!openOpt);
        else return;
    }

    const { dispatch } = useContext(SearchContext);
    const { user } = useContext(AuthContext);

    //Search 
    const handleSearch = () => {
        closeDateOpt();
        dispatch({ type: "NEW_SEARCH", payload: { destination, dates, options } });
        navigate('/hotels', { state: { destination, dates, options } });
    }

    //Main component
    return (
        <div className='header'>
            <div className={type === 'list' ? "headerContainer listMode" : "headerContainer"}>
                <HeaderList />

                {type !== 'list' &&
                    <>
                        <h1 className='headerTitle'>A lifetime of Discounts? It's Genius.</h1>
                        <p className='headerDescription'>Get rewards for your travels - unlock instant savings of 10% or more with free Booking account</p>
                        {!user && <button className='headerBtn'>Sign in / Register</button>}
                        <div className="headerSearch">
                            <div className="headerSearchItem">
                                <FontAwesomeIcon icon={faBed} className='headerIcon' />
                                <input type="text"
                                    placeholder='Where are you going?'
                                    className='headerSearchInput'
                                    onClick={closeDateOpt}
                                    onChange={e => setDestination(e.target.value)}
                                />
                            </div>
                            <div className="headerSearchItem">
                                <FontAwesomeIcon icon={faCalendarDays} className='headerIcon' />
                                <span
                                    onClick={changeStateDate}
                                    className='headerSearchText'>
                                    {
                                        `${format(dates[0].startDate, "MM/dd/yyyy")}
                                        to
                                        ${format(dates[0].endDate, "MM/dd/yyyy")}`
                                    }
                                </span>
                                {openDate && <DateRange
                                    className='date'
                                    editableDateInputs={true}
                                    onChange={item => setDates([item.selection])}
                                    moveRangeOnFirstSelection={true}
                                    ranges={dates}
                                    minDate={new Date}
                                />}
                            </div>
                            <div className="headerSearchItem">
                                <FontAwesomeIcon icon={faPerson} className='headerIcon' />
                                <span className='headerSearchText'
                                    onClick={changeStateOpt}>
                                    {`${options.adults} adult · ${options.children} children · ${options.rooms} room`}
                                </span>
                                {openOpt && <div className="options">
                                    <div className="optionItem">
                                        <span className="optionText">Adults</span>
                                        <div className="optionCounter">
                                            <button
                                                disabled={options.adults <= 1}
                                                className="optionBtn"
                                                onClick={() => changeNum("adults", "decrease")}>
                                                −
                                            </button>
                                            <span className="optionText">{options.adults}</span>
                                            <button
                                                disabled={options.adults >= 9}
                                                className="optionBtn"
                                                onClick={() => changeNum("adults", "increase")}>
                                                +
                                            </button>
                                        </div>
                                    </div>
                                    <div className="optionItem">
                                        <span className="optionText">Children</span>
                                        <div className="optionCounter">
                                            <button
                                                disabled={options.children <= 0}
                                                className="optionBtn"
                                                onClick={() => changeNum("children", "decrease")}>
                                                −
                                            </button>
                                            <span className="optionText">{options.children}</span>
                                            <button
                                                disabled={options.children >= 9}
                                                className="optionBtn"
                                                onClick={() => changeNum("children", "increase")}>
                                                +
                                            </button>
                                        </div>
                                    </div>
                                    <div className="optionItem">
                                        <span className="optionText">Room</span>
                                        <div className="optionCounter">
                                            <button
                                                disabled={options.rooms <= 1}
                                                className="optionBtn"
                                                onClick={() => changeNum("rooms", "decrease")}>
                                                −
                                            </button>
                                            <span className="optionText">{options.rooms}</span>
                                            <button
                                                disabled={options.rooms >= 5}
                                                className="optionBtn"
                                                onClick={() => changeNum("rooms", "increase")}>
                                                +
                                            </button>
                                        </div>
                                    </div>
                                </div>}
                            </div>
                            <div className="headerSearchItem">
                                <button
                                    className='headerBtn headerSearchBtn'
                                    onClick={handleSearch}>
                                    Search
                                </button>
                            </div>
                        </div>
                    </>
                }
            </div>
        </div >
    )
}
export default Header;