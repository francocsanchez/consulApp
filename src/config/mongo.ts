import mongoose from "mongoose";
import colors from "colors";
import { exit } from "node:process";

import dotenv from "dotenv";
dotenv.config();

export const connectMongo = async () => {
  const url = process.env.DATABASE_MONGO;

  if (!url) {
    throw new Error("DATABASE_MONGO no está definido en las variables de entorno");
  }

  try {
    const connection = await mongoose.connect(url);

    const URL = `${connection.connection.host}:${connection.connection.port}`;
    console.log(colors.cyan.bold(`Mongo DB conectado en ${URL}`));
  } catch (error) {
    console.log(colors.red.bold("Error al conectar con Mongo DB"));
    exit(1);
  }
};
