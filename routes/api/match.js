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
const Match = require("../../models/Match.js");

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
      // console.log(profile);

      Profile.find({ gender: profile.lookingfor })
        .populate("user")
        .then(profiles => {
          let array = [];
          profiles.filter(value => {
            let count = 0;
            // console.log(profile.user.done.length);

            if (profile.user.done.length > 0) {
              for (let i = 0; i < profile.user.done.length; i++) {
                // console.log( value.user._id);
                // console.log(value.user._id + " " + profile.user.done[i]);
                if (profile.user.done[i] == value.user._id) {
                  // console.log(value.user._id + " " + profile.user.done[i]);
                  count++;
                  // array.push(value);
                  // break;
                }
                if (i == profile.user.done.length - 1) {
                  if (count == 0) {
                    array.push(value);
                  }
                }
                // else {
                //   array.push(value);
                // }
              }
            } else if (profile.user.done.length == 0) {
              array = profiles;
            }
          });
          // console.log(array);

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

router.post("/MatchFound/:id", (req, res) => {
  User.findOne({ _id: req.params.id })
    .then(user => {
      User.findOne({ _id: req.user._id })
        .then(me => {
          for (let i = 0; i < req.user.LikedBy.length; i++) {
            console.log(
              "USER_id=========" +
                me.LikedBy[i].user +
                typeof me.LikedBy[i].user
            );
            console.log("USER========" + user._id + typeof user._id);
            let a = user._id;
            let b = me.LikedBy[i].user;

            if (JSON.stringify(a) == JSON.stringify(b)) {
              console.log("CAME IN IF");

              // console.log(
              //   typeof req.user._id + "......" + typeof req.params.id
              // );

              me.Matches.unshift(req.params.id);
              me.save()
                .then(me => res.json(me))
                .catch(err => console.log(err));

              user.Matches.unshift(JSON.stringify(req.user._id));
              user
                .save()
                .then(user => {})
                .catch(err => console.log(err));

              // res.json(me);
            } else {
              console.log("NOOOOOOOOOOO FOOOOOOOUUUUUUUNNNNNNNDDDDDD");
            }
          }
        })
        .catch(err => console.log(err));
    })
    .catch(err => console.log(err));
});

module.exports = router;
