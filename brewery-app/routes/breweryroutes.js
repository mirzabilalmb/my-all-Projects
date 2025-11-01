const express = require("express");
const axios = require("axios");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("Welcome to Brewery App! Go to /breweries to see data.");
});

router.get("/breweries", async (req, res) => {
  try {
    const response = await axios.get("https://api.openbrewerydb.org/v1/breweries?per_page=10");
    const breweries = response.data;

    if (!breweries || breweries.length === 0) {
      return res.render("error", { message: "No breweries found." });
    }

    res.render("index", { breweries });
  } catch (error) {
    console.error("API Error:", error.message);
    res.status(500).render("error", { message: "Failed to fetch breweries." });
  }
});

module.exports = router;
