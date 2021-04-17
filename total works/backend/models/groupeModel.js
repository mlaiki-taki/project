// require mongoose
import mongoose from 'mongoose'
import withCreatedAt from "../enhancer/withCreatedAt"
import withUpdatedAt from "../enhancer/withUpdatedAt"
// schema
const schema = mongoose.Schema

const groupeSchema = new schema({
    name: {
        type: String,
        required: true,
        unique :true
    },
    description:{
        type: String
        },
    members:[{
        type: mongoose.Schema.Types.ObjectId,
        ref:'user'
    }],
    admin:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref:'user'
    },
    posts:[{
        type: mongoose.Schema.Types.ObjectId,
        ref:'post'
    }],
    avatar:{
        type: String
    }
},[withCreatedAt(), withUpdatedAt()])

const groupeModel = mongoose.model('groupe', groupeSchema)
module.exports = groupeModel