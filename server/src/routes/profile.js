import express from "express";
import { userAuth } from "../middlewares/auth.js";
import { User } from "../models/user.js";

export const profileRouter = express.Router();

profileRouter.get("/profile", userAuth, async (req, res) => {
  try {
    // this user is set in req, after authentication. not to run db query again. see userAuth
    if (req.user) {
      res.send("Profile data fetched for " + req.user.firstName);
    } else {
      res.send("UnAuthorized Access");
    }
  } catch (error) {
    res.status(400).send("Something went wrong! " + error.message);
  }
});

profileRouter.get("/user/:firstName", userAuth, async (req, res) => {
  try {
    // const users = await User.find({}); // to get all users
    const user = await User.find({ firstName: req.params.firstName });
    if (!User.length) {
      res.status(404).send("User not found");
    }

    res.send(user);
  } catch (error) {
    res.status(401).send("Something went wrong " + +error.message);
  }
});

profileRouter.patch("/user/:id", userAuth, async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      { _id: req.params.id },
      req.body,
      { runValidators: true },
    );

    if (user) {
      res.status(200).send("User updated successfully");
    } else {
      res.status(404).send("User not found");
    }
  } catch (error) {
    res
      .status(400)
      .send("Something went wrong! Not able to update " + error.message);
  }
});

profileRouter.delete("/user/:id", userAuth, async (req, res) => {
  try {
    const user = await User.findByIdAndDelete({ _id: req.params.id });

    if (user) {
      res.status(200).send("User deleted successfully");
    } else {
      res.status(404).send("User not found");
    }
  } catch (error) {
    res
      .status(400)
      .send("Something went wrong! Not able to delete " + +error.message);
  }
});

// In this Router, b is optional
// app.get("/ab?c", (req, res) => {
//     res.send("hahah");
// });

// In this Router, bc is optional
// app.get("/a(bc)?d", (req, res) => {
//     res.send("hahah");
// });

// In this Router, b can occur any no of times. its a regex pattern
// app.get("/ab+c", (req, res) => {
//     res.send("hahah");
// });
