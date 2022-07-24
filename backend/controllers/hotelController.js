import Hotel from "../models/HotelModel.js"
import Room from '../models/RoomModel.js'

//CreateHotel
export const createHotel = async (req, res, next) => {
    const newHotel = new Hotel(req.body)

    try {
        const savedHotel = await newHotel.save()
        res.status(200).json(savedHotel)
    }
    catch (err) {
        next(err)
    }
}

//UpdateHotel
export const updateHotel = async (req, res, next) => {
    try {
        const updatedHotel = await Hotel
            .findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
        res.status(200).json(updatedHotel);
    } catch (err) {
        next(err)
    }
}

//DeleteHotel
export const deleteHotel = async (req, res, next) => {
    try {
        await Hotel.findByIdAndDelete(req.params.id);
        res.status(200).json("Hotel has been deleted");
    } catch (err) {
        next(err);
    }
}

//GetHotel
export const getHotel = async (req, res, next) => {
    try {
        const hotel = await Hotel.findById(req.params.id);
        res.status(200).json(hotel);
    } catch (err) {
        next(err);
    }
}

//GetAllHotels
export const getAllHotels = async (req, res, next) => {
    const { min, max, ...others } = req.query;
    try {
        const hotels = await Hotel
            .find({ ...others, cheapestPrice: { $gt: min || 1, $lt: max || 999 } })
            .limit(req.query.limit);
        res.status(200).json(hotels);
    } catch (err) {
        next(err);
    }
}

export const countByCity = async (req, res, next) => {
    const cities = req.query.cities.split(",");
    try {
        const list = await Promise.all(
            cities.map((city) => {
                return Hotel.countDocuments({ city: city });
            })
        );
        res.status(200).json(list);
    } catch (err) {
        next(err);
    }
};

export const countByType = async (req, res, next) => {
    try {
        const hotelCount = await Hotel.countDocuments({ type: "hotels" });
        const apartCount = await Hotel.countDocuments({ type: "apartments" });
        const resortsCount = await Hotel.countDocuments({ type: "resorts" });
        const villaCount = await Hotel.countDocuments({ type: "villas" });
        const motelCount = await Hotel.countDocuments({ type: "motels" });
        const hostelCount = await Hotel.countDocuments({ type: "hostels" });
        res.status(200).json([
            { type: "hotels", count: hotelCount },
            { type: "apartments", count: apartCount },
            { type: "resorts", count: resortsCount },
            { type: "villas", count: villaCount },
            { type: "motels", count: motelCount },
            { type: "hostels", count: hostelCount },
        ]);
    } catch (err) {
        next(err);
    }
};

export const getHotelRooms = async (req, res, next) => {
    try {
        const hotel = await Hotel.findById(req.params.id);
        const list = await Promise.all(
            hotel.rooms.map(room => {
                return Room.findById(room)
            })
        )

        res.status(200).json(list)
    } catch (err) {
        next(err);
    }
}


