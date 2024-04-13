import mongoose from "mongoose";
import { MONOGO_URI } from "./app";

mongoose
  .connect(MONOGO_URI)
  .then(() => console.log("Database connected ✔️"))
  .catch((error) => console.error(error));

export const db = mongoose.connection;
