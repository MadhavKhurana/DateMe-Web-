const express = require("express");
const router = express.Router();
//const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys.js");
const passport = require("passport");
const isAuth = require("./isAuth");

//const Match = require("../../models/Match.js");
const Profile = require("../../models/Profile.js");
const User = require("../../models/User.js");

router.get("/test", (req, res) => res.json({ msg: "Match Works" }));

router.post("/like/:id", isAuth, (req, res) => {
  Profile.findOne({ user: req.user._id })
    .then(profile => {
      User.findById(req.params.id).then(user => {
        user.LikedBy.unshift({ user: req.user._id });
        user.save().then(user => res.json(user));
      });
    })
    .catch(err => res.status(404).json({ error: "Some Like Error" }));
});

router.get("/allLookingFor", (req, res) => {
  let lookingfor;
  Profile.findOne({ user: req.user._id })
    .then(profile => {
      Profile.findOne({ gender: profile.lookingfor })
        .populate("user")
        .then(profiles => {
          const obj = {
            profile: profiles,
            user: profiles.user
          };
          res.json(obj);
        })
        .catch(err => {
          console.log(err);
        });
    })
    .catch(err => {
      console.log(err);
    });
});

router.get("/", isAuth, (req, res) => {
  Profile.find({ gender: "Male" });
});

module.exports = router;
