import express from "express";
import { connectMongo } from "./config/mongo";
import dentistRoute from "./routes/dentistRoute";

connectMongo();
const server = express();
server.use(express.json());

server.use("/api/dentist", dentistRoute);

export default server;
