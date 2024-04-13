import { Router } from "express";
const router = Router();

router.get("/", (req, res) => {
  res.render("index");
});

router.get("/books/howItWorks", (req, res) => {
  res.render("books/howItWorks");
});

export default router;
