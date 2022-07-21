import express from "express";
import { createSubEmail, deleteSubEmail, getAllSubEmails, getSubEmail } from "../controllers/subEmailController.js";

const router = express.Router();

//Create
router.post('/', createSubEmail)

//Delete
router.delete('/:id', deleteSubEmail)

//Get
router.get('/:id', getSubEmail)

//GetAll
router.get('/', getAllSubEmails)

export default router;