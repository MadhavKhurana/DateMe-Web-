const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  //    mainpic: {
  //        type:String,
  //
  //    },
  date: {
    type: Date,
    default: Date.now
  },
  LikedBy: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: "users"
      }
    }
  ],
  done: []

  //   Matches=[]
});

module.exports = User = mongoose.model("users", UserSchema);
