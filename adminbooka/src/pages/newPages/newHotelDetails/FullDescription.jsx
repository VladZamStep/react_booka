import useFetch from '../../../components/hooks/useFetch';
import '../newPage.scss'

const FullDescription = (props) => {

    const { data, loading, error } = useFetch("http://localhost:8800/api/rooms");
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