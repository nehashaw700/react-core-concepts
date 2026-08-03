import { rateLimit } from "express-rate-limit";

export const limiter = (req, res, next) => {
  try {
    // it means allow 100 max request in 15 mins
    rateLimit({
      windowMS: 15 * 60 * 1000,
      max: 100,
      message: {
        success: false,
        message: "Too many requests! Try again later!",
      },
    });

    next();
  } catch (error) {
    res.status(400).send("Something went wrong!" + error);
  }
};
