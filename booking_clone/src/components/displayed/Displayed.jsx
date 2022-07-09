import React from 'react'
import useFetch from '../../hooks/useFetch.js'
import './displayed.scss'
const Displayed = () => {

    const loadingMessage = "Loading...";
    const { data, loading, error } = useFetch("http://localhost:8800/api/hotels/countByCity?cities=london,madrid,rome")
    console.log(data);

    return (
        <div className='displayContainer'>
            <div className='displayed'>
                {loading ? loadingMessage : (
                    <>
                        <div className="displayedItem">
                            <img className="displayedImg"
                                src="https://proprikol.ru/wp-content/uploads/2020/09/kartinki-los-andzheles-45.jpg"
                                alt=""
                            />
                            <div className="imgItems">
                                <h1 className="imgName">Los Angeles</h1>
                                <h2 className="imgProp">{data[0]} properties</h2>
                            </div>
                        </div>
                        <div className="displayedItem">
                            <img src="https://static.independent.co.uk/s3fs-public/thumbnails/image/2018/01/31/09/new-york-main-image.jpg" alt="" className="displayedImg" />
                            <div className="imgItems">
                                <h1 className="imgName">New York</h1>
                                <h2 className="imgProp">{data[1]} properties</h2>
                            </div>
                        </div>
                        <div className="displayedItem">
                            <img src="https://heremag-prod-app-deps-s3heremagassets-bfie27mzpk03.s3.amazonaws.com/wp-content/uploads/2019/12/04151224/atlanta-downtown-i85-1200x887.jpg" alt="" className="displayedImg" />
                            <div className="imgItems">
                                <h1 className="imgName">Atlanta</h1>
                                <h2 className="imgProp">{data[2]} properties</h2>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    )
}
export default Displayed;