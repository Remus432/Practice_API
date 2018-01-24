// Import modules
const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const jsonData = require("./public/db.json");

// Init App
const app = express();

// Load static files
app.use("/", express.static(path.join(__dirname, "public")));


// Load View Engine
app.set("views", path.join(__dirname, "views"));
// Set View Engine
app.set("view engine", "pug")

// Parse application/x-www-form-urlencoded
const urlencodedParser = bodyParser.urlencoded({ extended: false });

// Parse application/json
const jsonParser = bodyParser.json();

// Home request
app.get("/", (req, res) => {
    res.render("index", {
        songs: jsonData,
        artists: ["AC/DC", "Iron Maiden", "The Disturbed", "Bon Jovi", "Parkway Drives"]
    });
})

// API Request
app.get("/artists", (req, res) => {
    res.json(jsonData)
})

// Listen to port
app.listen(3000, () => {
    console.log("Connection to port 3000 has been established...");
})