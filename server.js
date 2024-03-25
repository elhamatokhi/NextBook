const express = require("express");
const app = express();

app.use(express.static("public"));
app.get("/", (req, res) => {
  res.sendFile("index.html", { root: __dirname });
});

app.get("/book/:id", (req, res) => {
  // res.sendFile("index.html", { root: __dirname });
  res.send(`Book Number ${req.params.id}`);
});

app.get("/addNew", (req, res) => {
  res.sendFile("public/pages/addNew.html", { root: __dirname });
});

app.get("/howItWorks", (req, res) => {
  res.sendFile("public/pages/howItWorks.html", { root: __dirname });
});

app.listen(3000);
