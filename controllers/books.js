import { Router } from "express";
import { Book } from "../models/book.js";

const router = Router();

router.get("/books", async (req, res) => {
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

router.post("/books", async (req, res) => {
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

    res.redirect(`books/addNew`);
  } catch (error) {
    console.error(error);
    res.send("Error: The book could not be added.");
  }
});

router.get("/books/addNew", (req, res) => {
  res.render("books/addNew");
});

router.get("/books/:genre", async (req, res) => {
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

router.post("/books/:genre", async (req, res) => {
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

router.get("/books/:genre/edit", async (req, res) => {
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

router.get("/books/:genre/delete", async (req, res) => {
  try {
    await Book.findOneAndDelete({ genre: req.params.genre });
    res.redirect("/books");
  } catch (error) {
    console.error(error);
    res.send("Error: No book was deleted.");
  }
});

export default router;
