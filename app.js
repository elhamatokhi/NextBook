import { PORT } from "./config/app.js";
import "./config/database.js";
import simpleRoutes from "./controllers/simple-pages.js";
import bookRoutes from "./controllers/books.js";
import express from "express";
const app = express();

app.use(simpleRoutes);
app.use(bookRoutes);
app.set("view engine", "ejs");
app.set("views", "public/pages");

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

app.listen(PORT);
