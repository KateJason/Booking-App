import express from "express";
import path from "path";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";

import authRoute from "./routers/auth.js";
import usersRoute from "./routers/users.js";
import hotelsRoute from "./routers/hotels.js";
import roomsRoute from "./routers/rooms.js";
import cookieParser from "cookie-parser";

const app = express();
dotenv.config();
const connect_mongodb = async () => {
  try {
    await mongoose
      .connect(process.env.MONGO_URL)
      .then(() => console.log("mongoDB Connection Successfull"));
  } catch (error) {
    throw error;
  }
};
mongoose.connection.on("connected", () => {
  console.log("mongoDB connected");
});
mongoose.connection.on("disconnected", () => {
  console.log("mongoDB disconnected");
});

//middleware
//app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.json());
app.use(cors())

app.use("/auth", authRoute);
app.use("/users", usersRoute);
app.use("/hotels", hotelsRoute);
app.use("/rooms", roomsRoute);

app.use((err, req, res, next) => {
  const errorStstus = err.status || 500;
  const errorMessage = err.message || "something went wrong!";

  return res.status(errorStstus).json({
    success: false,
    status: errorStstus,
    message: errorMessage,
    stack: err.stack,
  });
});

app.listen(process.env.MainPort, process.env.Hostname, () => {
  connect_mongodb();
  console.log(
    `Server running at http://${process.env.Hostname}:${process.env.MainPort}/`
  );
});
