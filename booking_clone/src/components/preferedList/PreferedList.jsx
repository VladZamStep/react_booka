import useFetch from '../../hooks/useFetch';
import LoadingPreferdList from './loadingPreferdList/LoadingPreferdList';
import './preferedList.scss';

const PreferedList = () => {

    const { data, loading } = useFetch("http://localhost:8800/api/hotels?featured=true");

    return (
        < div className='prefList' >
            {loading ? <LoadingPreferdList /> : (
                <>
                    {data.map(element => (
                        <div className="prefListItem" key={element._id}>
                            <img src={element.photos[0]} alt="" />
                            <b className="prefName">{element.name}</b>
                            <span className="prefCity">{element.city}</span>
                            <span className="prefPrice">Starting from <b>US${element.cheapestPrice}</b></span>
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