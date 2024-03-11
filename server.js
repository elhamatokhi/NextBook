const express = require("express");
const app = express();

app.listen(3000);

app.use(express.static("public"));
app.get("/", (req, res) => {
  res.sendFile("index.html", { root: __dirname });
});

app.get("/index/:id", (req, res) => {
  res.sendFile("index.html", { root: __dirname });
});

app.get("/addNew.html", (req, res) => {
  res.sendFile("NavbarLinkedFiles/addNew.html", { root: __dirname });
});

app.get("/howItWorks.html", (req, res) => {
  res.sendFile("NavbarLinkedFiles/howItWorks.html", { root: __dirname });
});
