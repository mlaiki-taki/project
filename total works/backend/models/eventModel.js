// require mongoose
import mongoose from 'mongoose'
import withCreatedAt from "../enhancer/withCreatedAt"
import withUpdatedAt from "../enhancer/withUpdatedAt"
// schema
const schema = mongoose.Schema

const eventSchema = new schema({
    title: {
        type: String,
        required: true
    },
    destination: {
        type: String,
        required: true,
    },
    departure: {
        type: Date,
        required: true
    },
    openToSubscribe: {
        type: Boolean,
        default:true
    },
    description: {
        type: String,
        required: true
    },
    admin: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'user'

    },
    participants:[ {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    }],
    media: [{
        type: String,
        required: true
    }],
    contact: {
        email: String,
        PhoneNUmber: String
    },
    isPublic: {
        type: Boolean,
        default:true
    },
    groupe: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'groupe'
    },
    isValid: {
        type: Boolean,
        default:false
    },
},[withCreatedAt(), withUpdatedAt()])

const eventModel = mongoose.model('event', eventSchema)
module.exports = eventModel


