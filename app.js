import { PORT } from "./config/app.js";
import express from "express";
import mongoose from "mongoose";
const app = express();
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Database Connected"))
  .catch((error) => console.error(error));

app.set("view engine", "ejs");
app.set("views", "public/pages");

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

//Database
const bookSchema = new mongoose.Schema({
  name: { type: String, required: true },
  author: { type: String, required: true },
  pages: Number,
  review: { type: String, unique: true },
  genre: String,
  rating: { type: Number, required: true },
  isInStock: { type: Boolean, default: true, required: true },
});

const Book = mongoose.model("Book", bookSchema);
//DataBasess - END

// Routes Begin
app.get("/", (req, res) => {
  res.render("index");
});

app.get("/books/addNew", (req, res) => {
  res.render("books/addNew");
});

app.get("/books/howItWorks", (req, res) => {
  res.render("books/howItWorks");
});

app.get("/books", async (req, res) => {
  try {
    const books = await Book.find({}).exec();
    res.render("books/index", {
      books: books,
    });
  } catch (error) {
    console.error(error);
    res.render("books/index", {
      books: [],
    });
  }
});

app.post("/books", async (req, res) => {
  try {
    const book = new Book({
      name: req.body.name,
      author: req.body.author,
      pages: req.body.pages,
      review: req.body.review,
      genre: req.body.genre,
      rating: req.body.rating,
    });
    await book.save();
    res.send("Book Added");
  } catch (error) {
    console.error(error);
    res.send("Error: The book could not be added.");
  }
});

app.get("/books/:genre", async (req, res) => {
  try {
    const genre = req.params.genre;
    const book = await Book.findOne({ genre: genre }).exec();
    if (!book) throw new Error("Book not find");
    res.render("books/show", {
      book: book,
    });
  } catch (error) {
    console.error(error);
    res.status(404).send("Couln't find the book you're looking for.");
  }
});

app.post("/books/:genre", async (req, res) => {
  try {
    const book = await Book.findOneAndUpdate(
      { genre: req.params.genre },
      req.body,
      { new: true }
    );

    res.redirect(`/books/${book.genre}`);
  } catch (error) {
    console.error(error);
    res.send("Error: The book could not be update.");
  }
});

app.get("/books/:genre/edit", async (req, res) => {
  try {
    const genre = req.params.genre;
    const book = await Book.findOne({ genre: genre }).exec();
    if (!book) throw new Error("book not found");
    res.render("books/edit", {
      book: book,
    });
  } catch (error) {
    console.error(error);
    res.status(404).send("Could not find the book you're looking for.");
  }
});

app.get("/books/:genre/delete", async (req, res) => {
  try {
    await Book.findOneAndDelete({ genre: req.params.genre });
    res.redirect("/books");
  } catch (error) {
    console.error(error);
    res.send("Error: No book was deleted.");
  }
});

app.listen(PORT);
