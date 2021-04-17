// require mongoose
import mongoose from 'mongoose'


// schema
const schema = mongoose.Schema

const commentSchema = new schema({
    text:{
        type: String       
    },
    like_ammount:  {
        type: Number,
        default:0,
        required: true,
    },
    author:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref:'user',
        autopopulate: true
    },
    post:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref:'post'
    },
    created_at: {type: Date}

})
commentSchema.plugin(require('mongoose-autopopulate'));
const commentModel = mongoose.model('comment', commentSchema)
module.exports = commentModel