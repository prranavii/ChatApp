import path from "path";
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/auth.routes.js";
import messageRoutes from "./routes/message.routes.js";
import userRoutes from "./routes/user.routes.js";
import mongoose from "mongoose";
import { app, server } from "./socket/socket.js";

// Load environment variables from.env file

dotenv.config({ path: "./config.env" });
const MONGO_DB_URL =  process.env.MONGO_DB_URL ||  "mongodb+srv://pranavijain47:AsDoFbNfHDDgpDbX@cluster0.30luqry.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
mongoose
  .connect(MONGO_DB_URL)
  .then(function (db) {
    console.log("Connected to MongoDB");
  })
  .catch(function (err) {
    console.log("Could not connect to MongoDB", err);
  });
const __dirname = path.resolve();
// PORT should be assigned after calling dotenv.config() because we need to access the env variables. Didn't realize while recording the video. Sorry for the confusion.
const PORT = process.env.PORT || 5000;

app.use(express.json()); // to parse the incoming requests with JSON payloads (from req.body)
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);

app.use(express.static(path.join(__dirname, "/frontend/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
});

server.listen(PORT, () => {
  console.log(`Server Running on port ${PORT}`);
});
