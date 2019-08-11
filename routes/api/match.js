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
        user.save().then(users => res.json(users));
      });
    })
    .catch(err => res.status(404).json({ error: "Some Like Error" }));
});

router.get("/allLookingFor", (req, res) => {
  let lookingfor;
  Profile.findOne({ user: req.user._id })
    .populate("user")
    .then(profile => {
      Profile.find({ gender: profile.lookingfor })
        .populate("user")
        .then(profiles => {
          let array = [];
          profiles.filter(value => {
            // console.log(profile.user.done.length);

            if (profile.user.done.length > 0) {
              for (let i = 0; i < profile.user.done.length; i++) {
                if (value.user._id != profile.user.done[i]) {
                  array.push(value);
                  break;
                }
              }
            } else if (profile.user.done.length == 0) {
              array = profiles;
            }
          });
          console.log(array);

          res.json(array);
        })
        .catch(err => {
          console.log(err);
        });
    })
    .catch(err => {
      console.log(err);
    });
});

router.post("/done/:id", (req, res) => {
  User.findOne({ _id: req.user._id }).then(user => {
    user.done.unshift(req.params.id);
    user.save().then(users => res.json(users));
  });
});

router.get("/", isAuth, (req, res) => {
  Profile.find({ gender: "Male" });
});

module.exports = router;
