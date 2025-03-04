import colors from "colors";
import server from "./server";

import dotenv from "dotenv";
dotenv.config();

const port = process.env.APP_PORT || 4002;

server.listen(port, () => {
  console.log(colors.cyan.bold(`Server corriendo en el puerto:${port}`));
});
