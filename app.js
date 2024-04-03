const express = require("express");
const mongoose = require("mongoose");
const app = express();

mongoose
  .connect("mongodb://127.0.0.1:27017/NextBook")
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
});

const Book = mongoose.model("Book", bookSchema);
//DataBasess - END

// Routes Begin
app.get("/", (req, res) => {
  // Render the "index" view
  res.render("index");
});

app.get("/books", async (req, res) => {
  try {
    const books = await Book.find({}).exec();
    res.render("books/index", { books: books });
  } catch (error) {
    console.error(error);
    res.render("books/index", {
      books: [],
    });
  }
});

app.get("/books/addNew", (req, res) => {
  res.render("books/addNew");
});

// app.get("/books/:genre", (req, res) => {
//   const requestedgenre = req.params.genre;
//   res.send(`You searched for: ${requestedgenre}
//   `);
// });

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

app.get("/howItWorks", (req, res) => {
  // res.sendFile("public/pages/books/howItWorks", { root: __dirname });
  res.render("/pages/books/howItWorks");
});

app.listen(3000);
