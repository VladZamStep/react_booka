import express from "express";
import { createRoom, deleteRoom, getAllRooms, getRoom, updateRoom, updateRoomAvailability } from "../controllers/roomController.js";
import { verifyAdmin } from "../utils/verifyToken.js";

const router = express.Router();

//Create
router.post('/:hotelId', createRoom)
//Update
router.put('/:id', updateRoom)
router.put('/availability/:id', updateRoomAvailability)
//Delete
router.delete('/:id', deleteRoom)
//Get
router.get('/:id', getRoom)
//Get All
router.get('/', getAllRooms)


export default router;