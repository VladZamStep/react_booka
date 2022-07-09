import useFetch from '../../hooks/useFetch';
import './propertyList.scss';

const PropertyList = () => {

    const loadingMessage = "Loading...";
    const { data, loading } = useFetch("http://localhost:8800/api/hotels/countByType")

    const imgData = [
        "https://t-cf.bstatic.com/xdata/images/xphoto/square300/57584488.webp?k=bf724e4e9b9b75480bbe7fc675460a089ba6414fe4693b83ea3fdd8e938832a6&o=",
        "https://t-cf.bstatic.com/static/img/theme-index/carousel_320x240/card-image-apartments_300/9f60235dc09a3ac3f0a93adbc901c61ecd1ce72e.jpg",
        "https://t-cf.bstatic.com/static/img/theme-index/carousel_320x240/bg_resorts/6f87c6143fbd51a0bb5d15ca3b9cf84211ab0884.jpg",
        "https://t-cf.bstatic.com/static/img/theme-index/carousel_320x240/card-image-villas_300/dd0d7f8202676306a661aa4f0cf1ffab31286211.jpg",
        "https://t-cf.bstatic.com/static/img/theme-index/carousel_320x240/card-image-chalet_300/8ee014fcc493cb3334e25893a1dee8c6d36ed0ba.jpg",
        "https://t-cf.bstatic.com/static/img/theme-index/carousel_320x240/bg_cottages/5e1fd9cd716f4825c6c7eac5abe692c52cc64516.jpg"
    ];

    return (
        <div className='propListContainer'>
            <div className='propList'>
                {loading ? loadingMessage :
                    (<>
                        {data && imgData.map((img, index) => (
                            < div className="pListItem" key={index}>
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