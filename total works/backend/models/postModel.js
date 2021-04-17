// require mongoose
import mongoose from 'mongoose'


// schema
const schema = mongoose.Schema

const postSchema = new schema({
  
    text:{
        type: String,
        //  required: true,      
    },
    comments:[{
        type: mongoose.Schema.Types.ObjectId,
        ref:'comment'
    }],
    comment_amount:  {
        type: Number,
        default:0,
    },
    like_ammount:  {
        type: Number,
        default:0,
        required: true,
    },
     media:[{
         _id:false,
         type:String,
         link:String
     }],
     author:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref:'user'
    },
    groupe:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref:'groupe'
    },
     isValid: {
        type: Boolean,
        default:true
    },
    created_at: {type: Date}


})
const postModel = mongoose.model('post', postSchema)
module.exports = postModel