import './searchResult.css';
import { Link } from 'react-router-dom';

const SearchResult = (props) => {
    return (
        <div className="searchResult">
            <img className='srImg'
                src={props.element.photos[0]}
                alt="" />
            <div className="srDesc">
                <h1 className="srTitle">{props.element.name}</h1>
                <span className="srDistance">{props.element.distance}</span>
                <span className="srTaxiOpt">Free airport taxi</span>
                <span className="srSubtitle">Studio Apartment with Air conditioning</span>
                <span className="srCancelOpt">{props.element.description}</span>
                <span className="srCancelSubtitle">You can cancel later, so lock in this great price today!</span>
            </div>
            <div className="srDetails">
                {props.element.rating && <div className="srRating">
                    <span className="srRatText">Wonderful</span>
                    <button>{props.element.rating}</button>
                </div>}
                <div className="srOptions">
                    <span className="optInfo">1 night, 2 adults</span>
                    <span className="price">US${props.element.cheapestPrice}</span>
                    <span className="optInfo">Includes taxes and fees</span>
                    <Link to={`/hotels/${props.element._id}`}>
                        <button className="availBtn">See availability</button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default SearchResult