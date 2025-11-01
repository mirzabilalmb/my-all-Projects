
const express = require("express");
const path = require("path");

const app = express();
const PORT = 3000; // Localhost port number

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));


app.use(express.static(path.join(__dirname, "public")));


const breweryRoutes = require("./routes/breweryRoutes");
app.use("/", breweryRoutes);


app.use((req, res) => {
  res.status(404).render("error", { message: "Page not found!" });
});

app.use((err, req, res, next) => {
  console.error("Server Error:", err.stack);
  res.status(500).render("error", { message: "Something went wrong!" });
});

// ------------------------------

app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});