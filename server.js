const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const users = require("./routes/api/users.js");
const profile = require("./routes/api/profile.js");
const match = require("./routes/api/match.js");
const passport = require("passport");
const path = require("path");
const crypto = require("crypto");
const multer = require("multer");
const GridFsStorage = require("multer-gridfs-storage");
const Grid = require("gridfs-stream");
const methodOverride = require("method-override");
const session = require("express-session");

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverride("_method"));

//Db Config

const db = require("./config/keys.js").mongoURI;

//connect to mongodb

mongoose
  .connect(db)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

app.use(
  session({
    secret: "photonecademy",
    resave: true,
    saveUninitialized: true,
    maxAge: 86400000
  })
);

//passport middleware
app.use(passport.initialize());
app.use(passport.session());

//let gfs;

//conn.once('open',()=>{
//    // Init Stream
//    gfs=Grid(conn.db,mongoose.mongo);
//    gfs.collection('uploads')
//})

//Create Storage Engine

require("./config/passport")(passport);

//Use Routes
app.use("/api/users", users);
app.use("/api/profile", profile);
app.use("/api/match", match);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Running on port ${port}`));
