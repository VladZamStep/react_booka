import useFetch from '../../hooks/useFetch';
import './preferedList.css';

const PreferedList = () => {

    const loadingMessage = "Loading...";
    const { data, loading, error } = useFetch("http://localhost:8800/api/hotels?featured=true");

    return (
        < div className='prefList' >
            {loading ? loadingMessage : (
                <>
                    {data.map(element => (
                        <div className="prefListItem" key={element._id}>
                            <img src={element.photos[0]} alt="" />
                            <span className="prefName">{element.name}</span>
                            <span className="prefCity">{element.city}</span>
                            <span className="prefPrice">Starting from <span>US${element.cheapestPrice}</span></span>
                            <div className="prefRating">
                                <button>{element.rating}</button>
                                <span>{element.textRating}</span>
                            </div>
                        </div>
                    ))}
                </>
            )
            }
        </div >
    )
}
export default PreferedList;