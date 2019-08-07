const express = require("express");
const router = express.Router();
const formidable = require("formidable");
//const path = require("path");
//const crypto = require("crypto");
//const mongoose = require("mongoose");
const multer = require("multer");
const upload = multer({ dest: "public/uploads/" });
const isAuth = require("./isAuth");
const Profile = require("../../models/Profile");
const passport = require("passport");

router.get("/user", (req, res) => {
  res.send(req.user);
});

router.get("/test", (req, res) => res.json({ msg: "Profile Works" }));

router.post("/", (req, res) => {
  const profileFields = {};
  profileFields.user = req.user._id;

  if (req.body.age) profileFields.age = req.body.age;
  if (req.body.bio) profileFields.bio = req.body.bio;
  if (req.body.agerange) profileFields.agerange = req.body.agerange;
  if (req.body.maxdistance) profileFields.maxdistance = req.body.maxdistance;
  if (req.body.lookingfor) profileFields.lookingfor = req.body.lookingfor;
  if (req.body.gender) profileFields.gender = req.body.gender;

  profileFields.social = {};
  if (req.body.twitter) profileFields.twitter = req.body.twitter;
  if (req.body.facebook) profileFields.facebook = req.body.facebook;
  if (req.body.instagram) profileFields.instagram = req.body.instagram;

  Profile.findOne({ user: req.user._id }).then(profile => {
    if (profile) {
      //Update
      Profile.findOneAndUpdate(
        { user: req.user._id },
        { $set: profileFields },
        { new: true }
      ).then(profile => res.json(profile));
    } else {
      //create
      //Check if handle exists
      Profile.findOne({ handle: profileFields.handle }).then(profile => {
        new Profile(profileFields).save().then(profile => res.json(profile));
      });
    }
  });
});

router.post("/defaultSettings", (req, res) => {
  Profile.findOne({ user: req.user._id }).then(profile => {
    if (!profile) {
      let data = req.body;
      data.user = req.user._id;
      new Profile(data)
        .save()
        .then(data => {
          console.log("saved");
          res.json(data);
        })
        .catch(err => {
          console.log(err);
        });
    }
  });
});

router.post("/agerange", (req, res) => {
  Profile.findOne({ user: req.user._id }).then(profile => {
    profile.agerange = req.body.agerange;
    profile.save().then(profile => res.json(profile));
  });
});

router.post("/distance", (req, res) => {
  Profile.findOne({ user: req.user._id }).then(profile => {
    profile.maxdistance = req.body.distance;
    profile.save().then(profile => res.json(profile));
  });
});

router.post("/lookingfor", (req, res) => {
  Profile.findOne({ user: req.user._id }).then(profile => {
    profile.lookingfor = req.body.lookingfor;
    profile.save().then(profile => res.json(profile));
  });
});

router.get("/", (req, res) => {
  Profile.findOne({ user: req.user._id }).then(profile => {
    res.json(profile);
  });
});

router.post("/uploadPic", upload.any(), (req, res) => {
  res.send(req.files);
});

module.exports = router;
