import './headerList.css'
import { IoBedSharp } from 'react-icons/io5';
import { FaCar, FaRegPaperPlane, FaTaxi } from 'react-icons/fa';
import { MdOutlineAttractions } from 'react-icons/md';

const HeaderList = () => {
    return (
        <div className="headerList">
            <div className="headerListItem active">
                <IoBedSharp />
                <span>Stays</span>
            </div>
            <div className="headerListItem">
                <FaRegPaperPlane />
                <span>Flights</span>
            </div>
            <div className="headerListItem">
                <FaCar />
                <span>Car rentals</span>
            </div>
            <div className="headerListItem">
                <MdOutlineAttractions />
                <span>Attractions</span>
            </div>
            <div className="headerListItem">
                <FaTaxi />
                <span>Taxi</span>
            </div>
        </div>
    )
}

export default HeaderList