import Room from "../models/Room.js";
import Hotel from "../models/Hotel.js";
import { createError } from "../utils/error.js";

export const createRoom = async (req, res, next) => {
  const hotel_Id = req.params.hotel_Id;
  const newRoom = new Room(req.body);

  try {
    const saveRoom = await newRoom.save();
    try {
      await Hotel.findByIdAndUpdate(hotel_Id, {
        $push: { rooms: saveRoom._id },
      });
    } catch (err) {
      next(err);
    }
    res.status(200).json(saveRoom);
  } catch (err) {
    next(createError(500, "Failed to create room, Error Message:   " + err)); // 使用 createError 函數
  }
};

export const updateRoom = async (req, res, next) => {
  try {
    const updateRoom = await Room.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    if (!updateRoom) {
      next(createError(404, req.params.id + "  Room not exit"));
    } else {
      res.status(200).json(updateRoom);
    }
  } catch (err) {
    next(err);
  }
};
export const updateRoomAvailability = async (req, res, next) => {
  try {
    await Room.updateOne(
      { "roomNumbers._id": req.params.id },
      {
        $push: {
          "roomNumbers.$.unavailableDates": req.body.dates
        },
      }
    );
    res.status(200).json("Room status has been updated.");
  } catch (err) {
    next(err);
  }
};
export const deleteRoom = async (req, res, next) => {
  const hotel_Id = req.params.hotel_id;
  try {
    await Room.findByIdAndDelete(req.params.Room_id);
    try {
      await Hotel.findByIdAndUpdate(hotel_Id, {
        $pull: { rooms: req.params.Room_id },
      });
    } catch (err) {
      next(err);
    }
    res.status(200).json("Room has been deleted");
  } catch (err) {
    next(err);
  }
};
export const getRoom = async (req, res, next) => {
  try {
    const room = await Room.findById(req.params.id);
    if (room) {
      res.status(200).json(room);
    } else {
      res.status(200).json("we can't find " + req.params.id);
    }
  } catch (err) {
    next(err);
  }
};
export const getRooms = async (req, res, next) => {
  //const failed = true;
  //if (failed) return next(createError(401,"You are not authenticated!!"));
  try {
    const rooms = await Room.find();
    res.status(200).json(rooms);
  } catch (err) {
    next(err);
  }
};
