import User from "../models/User.js";
import { createError } from "../utils/error.js";

export const updateUser = async (req, res, next) => {
  try {
    const updateUser = await User.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    if (!updateUser) {
      next(createError(404, req.params.id + "  User not exit"));
    } else {
      res.status(200).json(updateUser);
    }
  } catch (err) {
    next(err);
  }
};
export const deleteUser = async (req, res, next) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) {
      next(createError(404, req.params.id + " User not found."));
    } else {
      res.status(200).json(req.params.id + " User has been deleted.");
    }
  } catch (err) {
    next(err);
  }
};
export const deleteAllUser = async (req, res, next) => {
  try {
    // Delete all users
    await User.deleteMany({});
    res.send("All users deleted successfully.");
  } catch (err) {
    console.error("Error deleting users", err);
    next(createError(505, "Error deleting users: "+err ));
  }
};
export const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};
export const getUsers = async (req, res, next) => {
  const failed = true;
  //if (failed) return next(createError(401,"You are not authenticated!!"));
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    next(err);
  }
};
