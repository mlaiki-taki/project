import eventModel from "../models/eventModel"


/**
 * POST handler
 *  */
export const addEvent = async (req, res) => {
    try {
        const { title, destination, departure, openToSubscribe, description, admin, participants, media, contact, isPublic, groupe, isValid } = req.body
        // create and save the new user
        console.log(req.body)
        const newEvent = new neventModel({ title, destination, departure, openToSubscribe, description, admin, participants, media, contact, isPublic, groupe, isValid })
        await newEvent.save()
        res.status(200).send({ msg: 'user added successfully ...', newEvent })
    } catch (error) {
        res.status(500).send({ msg: "impossible to add new user", error })
    }
}
export const editEvent = async (req, res) => {
    try {
        const { _id, editedData } = req.body
        console.log(_id, editedData)

        const updatedElement = await eventModel.findOneAndUpdate({ _id },
            { $set: editedData }, { new: true, upsert: true })
        res.status(200).send({ msg: 'event  updated successfully ...', updatedElement })
    } catch (error) {
        res.status(500).send({ msg: "unable to update event", error })
    }
}
export const deleteEvent = async (req, res) => {
    try {
        const itemid = req.body.itemid
        await eventModel.deleteOne({ _id: itemid })
        res.status(200).send({ msg: 'event deleted successfully ...' })
    } catch (error) {
        res.status(500).send({ msg: "impossible to delete event", error })
    }
}
export const getAllEvent = async (req, res) => {
    try {
        const listEvent = await eventModel.find()
            .populate('admin')
        res.status(200).send(listEvent)

    } catch (error) {
        res.status(500).send({ msg: "unable to get events", error })
    }
}



