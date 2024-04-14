import { PORT } from "./config/app.js";
import "./config/database.js";
import simpleRoutes from "./controllers/simple-pages.js";
import booksRoutes from "./controllers/books.js";
import express from "express";
const app = express();
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");
app.set("views", "public/pages");

app.use(simpleRoutes);
app.use(booksRoutes);

app.listen(PORT);
