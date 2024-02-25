import jwt from "jsonwebtoken";
import { createError } from "./error.js";
import User from "../models/User.js";

export const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;
  if (!token) {
    return next(createError(401, "you are not authenticated!"));
  }

  jwt.verify(token, process.env.JWT, (err, user) => {
    if (err) return next(createError(403, "Token is not valid!"));
    req.user = user;
    next();
  });
};

export const verifyUser = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
      next();
    } else {
      return next(createError(403, "You are not authorized!"));
    }
  });
};
export const verifyAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    if (!req.user || typeof req.user.isAdmin === "undefined") {
      return next(createError(403, "User information is missing!"));
    } else if (req.user.isAdmin === true) {
      next();
    } else {
      return next(createError(403, "You are not admin authorized!"));
    }
  });
};
