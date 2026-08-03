import jwt from "jsonwebtoken";
import { User } from "../models/User.js";

const secret = "DEV@Sherwood$7860512";

export const adminAuth = (req, res, next) => {
  const token = "xyz";
  const isAdminAuthorised = token === "xyz";
  if (isAdminAuthorised) {
    next();
  } else {
    res.status(401).send("Admin not authorized");
  }
};

export const userAuth = async (req, res, next) => {
  try {
    if (!req.cookies.token) {
      throw new Error("Invalid Token");
    }

    const decodedMsg = await jwt.verify(req.cookies.token, secret);
    const { _id } = decodedMsg;

    const user = await User.findById(_id);
    if (user) {
      req.user = user;
      next();
    } else {
      throw new Error("Unauthorised Access");
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};
