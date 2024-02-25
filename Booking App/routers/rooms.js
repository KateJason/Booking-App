import express from "express";
import {
  createRoom,
  updateRoom,
  deleteRoom,
  getRoom,
  getRooms,
  updateRoomAvailability
} from "../controllers/room.js";
import { verifyAdmin, verifyToken, verifyUser } from "../utils/verifyToken.js";
const router = express.Router();

//Create
router.post("/:hotel_Id", verifyAdmin, createRoom);
//Update
router.put("/availability/:id", updateRoomAvailability);
router.put("/:id", verifyAdmin, updateRoom);
//Delete
router.delete("/:Room_id/:hotel_id", verifyAdmin, deleteRoom);
//Get
router.get("/:id", getRoom);
//Get all
router.get("/", getRooms);

export default router;
