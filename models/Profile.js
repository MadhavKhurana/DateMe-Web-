const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProfileSchema = new Schema({
  user: {
    type: String
  },
  bio: {
    type: String
  },
  age: {
    type: Number,
    required: true
  },
  agerange: {
    type: Number,
    default: 10
  },
  gender: {
    type: String
  },
  maxdistance: {
    type: Number,
    default: 10
  },
  lookingfor: {
    type: String,
    required: true
  },
  social: {
    twitter: {
      type: String
    },
    facebook: {
      type: String
    },
    instagram: {
      type: String
    }
  },
  images: []
});

module.exports = Profile = mongoose.model("profile", ProfileSchema);
