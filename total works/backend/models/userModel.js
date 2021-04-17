
// require mongoose
const mongoose = require('mongoose')
import regionEnum from '../enum/regionEnum'
import connectedStatusEnum from "../enum/connectedStatusEnum"
// schema
const schema = mongoose.Schema

const usertSchema = new schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    mobilePhone: {
        type: String,
        required: true,
        unique: true
    },
    region: {
        type: String,
        required: true,
        enum: regionEnum()
    },
    password: {
        type: String,
        required: true
    },
    avatar: {
        type: String
    },
    likedPost: [
        {
            type: String
        },
    ],
    connectedGroup: [{
        _id:false,
        groupe: String,
        connectedStatus: {
            type: String,
            default: false,
            enum: connectedStatusEnum(),
            defaultStatus: 'not_connected'
        }
    }],

})
const userModel = mongoose.model('user', usertSchema, "users")
module.exports = userModel