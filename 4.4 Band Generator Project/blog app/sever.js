const express = require("express");
const path = require("path");

const app = express();
const PORT = 3000;

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");

// In-memory posts
let posts = [];

// Routes
app.get("/", (req, res) => {
  res.render("index", { posts });
});

app.get("/new", (req, res) => {
  res.render("new");
});

app.post("/add", (req, res) => {
  const { title, content } = req.body;
  if (title && content) {
    posts.push({ title, content });
  }
  res.redirect("/");
});

app.get("/edit/:id", (req, res) => {
  const id = req.params.id;
  const post = posts[id];
  res.render("edit", { post, id });
});

app.post("/update/:id", (req, res) => {
  const id = req.params.id;
  posts[id] = { title: req.body.title, content: req.body.content };
  res.redirect("/");
});

app.post("/delete/:id", (req, res) => {
  const id = req.params.id;
  posts.splice(id, 1);
  res.redirect("/");
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});