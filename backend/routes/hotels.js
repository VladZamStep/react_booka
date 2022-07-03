import express from "express";
import { countByCity, countByType, createHotel, deleteHotel, getAllHotels, getHotel, getHotelRooms, updateHotel } from "../controllers/hotelController.js";
import { verifyAdmin } from "../utils/verifyToken.js";

const router = express.Router();

//Create
router.post('/', createHotel)
//Update
router.put('/:id', updateHotel)
//Delete
router.delete('/:id', deleteHotel)
//Get
router.get('/find/:id', getHotel)
//Get All
router.get('/', getAllHotels)
router.get('/countByCity', countByCity)
router.get('/countByType', countByType)
router.get('/room/:id', getHotelRooms)

export default router;