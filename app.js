// Import modules
const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const jsonData = require("./public/db.json");
const cors = require("cors");
const lowerCase = require("lower-case");

// Set port for heroku
const port = process.env.PORT || 8000;

// Init App
const app = express();


// CORS Middleware
app.use(cors());
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
app.get("/", (req, res) => {0
    res.render("index", {
        songs: jsonData,
        artists: ["AC/DC", "Iron Maiden", "The Disturbed", "Bon Jovi", "Parkway Drives"]
    });
})

// API Request
app.get("/api", (req, res) => {
    res.type("json");
    res.json(jsonData);
})

app.get("/api/artists/:name", (req, res) => {
    const artistName = req.params.name;
    for(let artist of jsonData.rap.artists) {
        if(lowerCase(artist.name) === lowerCase(artistName)) {
            res.type("json");
            res.json(artist);
        }
    }
    
})



// Listen to port
app.listen(port, () => {
    console.log("Connection to port 3000 has been established...");
})
