const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const MatchSchema=new Schema({
   user: {
        type: Schema.Types.ObjectId,
        ref: "users"
    },
   LikedBy:[],
   Matches=[]
})

module.exports=Match=mongoose.model('match',MatchSchema)