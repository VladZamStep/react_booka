import useFetch from '../../../../components/hooks/useFetch';
import '../newHotel.scss'

const RoomsArea = (props) => {

    const { data, loading } = useFetch("http://localhost:8800/api/rooms");

    return (
        <div className="selectRooms">
            <label>Rooms</label>
            <select id="rooms" multiple onChange={props.handleSelect}>
                {loading ? "loading" : data && data.map(room => (
                    <option
                        key={room._id}
                        value={room._id}
                    >
                        {room.title}
                    </option>
                ))}
            </select>
        </div>

    )
}

export default RoomsArea