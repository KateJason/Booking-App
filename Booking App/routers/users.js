import express from "express";
import User from "../models/User.js";
const router = express.Router();
import {
  updateUser,
  deleteUser,
  getUser,
  getUsers,
  deleteAllUser,
} from "../controllers/user.js";
import { verifyAdmin, verifyToken, verifyUser } from "../utils/verifyToken.js";
import { createError } from "../utils/error.js";

// router.get("/checkauthentication", verifyToken, async (req, res, next) => {
//   res.send("Hello user, you are logged in");
// });

// router.get("/checkuser/:id", verifyUser, (req, res, next) => {
//   res.send("hello user,you are logged in and you can delete your account");
// });

// router.get("/checkadmin/:id", verifyAdmin, (req, res, next) => {
//     res.send("hello ADMIN,you are logged in and you can delete user's account");
//   });
//Update
router.put("/:id", verifyUser, updateUser);
//Delete
router.delete("/:id", verifyUser, deleteUser);
//Delete all
// DELETE route to delete all users
//router.delete("/", verifyAdmin, deleteAllUser);
//Get
router.get("/:id", verifyUser, getUser);
//Get all
router.get("/", verifyAdmin, getUsers);

export default router;
