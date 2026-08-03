import express from "express";
import os from "os";
import cluster from "node:cluster";
import cookieParser from "cookie-parser";
import process from "node:process";
import { connectDB } from "./config/database.js";

import { authRouter } from "./routes/auth.js";
import { profileRouter } from "./routes/profile.js";
import { requestRouter } from "./routes/request.js";

const totalCPUs = os.cpus.length;

// This is done for load balancing purpose
if (cluster.isPrimary) {
  for (let i = 0; i < totalCPUs; i++) {
    console.log("isPrimary:", cluster.isPrimary);
    console.log("PID:", process.pid);
    cluster.fork();
  }
} else {
}

console.log("Worker process:", process.pid);
const app = express();
app.use(express.json());
app.use(cookieParser());

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);

connectDB()
  .then(() => {
    app.listen(7777, () => {
      console.log(
        `Server is listening at port 7777 and resolving request through process ID: ${process.pid}`,
      );
    });
  })
  .catch((error) => {
    console.log("error", error);
  });
