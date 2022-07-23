import useFetch from '../../hooks/useFetch';
import './propertyList.scss';
import { imgData } from './propertyImgData';
import LoadingPropertyList from './loadingPropertyList/LoadingPropertyList';

const PropertyList = () => {

    const { data, loading } = useFetch("http://localhost:8800/api/hotels/countByType")

    return (
        <div className='propListContainer'>
            <div className='propList'>
                {loading ? <LoadingPropertyList /> :
                    (<>
                        {data && imgData.map((img, index) => (
                            <div className="pListItem" key={index}>
                                <div className='imgPlate'>
                                    <img src={img} alt="" />
                                </div>
                                <div className="pListDesc">
                                    <h1>{data[index]?.type}</h1>
                                    <h2>{data[index]?.count} {data[index]?.type}</h2>
                                </div>
                            </div>
                        ))}
                    </>)
                }
            </div >
        </div>
    )
}
export default PropertyList;