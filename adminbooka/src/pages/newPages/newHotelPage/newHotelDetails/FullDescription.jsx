import useFetch from '../../../../components/hooks/useFetch';
import '../newHotel.scss'

const FullDescription = (props) => {

    const { data } = useFetch("http://localhost:8800/api/rooms");
    return (
        <>
            {data &&
                <div className="descriptionArea">
                    <label>Description</label>
                    <textarea
                        id="description"
                        type="text"
                        placeholder="Full hotel description"
                        onChange={props.handleChange}
                    />
                </div>
            }
        </>
    )
}

export default FullDescription