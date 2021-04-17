import groupeModel from "../models/groupeModel"


/**
 * POST handler
 *  */
export const addGroupe = async (req, res) => {
    console.log(req.body)
    try {
        const { name, description,members,admin, avatar } = req.body
        // create and save the new user
        const newGroupe = new groupeModel({ name, description,members,admin, avatar  })
        await newGroupe.save()
        res.status(200).send({ msg: 'groupe added successfully ...', newGroupe })
    } catch (error) {
        res.status(500).send({ msg: "impossible to add new groupe", error })
    }
}
export const editGroupe = async (req, res) => {
    try {
        const { _id, editedData } = req.body
        console.log(_id, editedData)

        const updatedElement = await groupeModel.findOneAndUpdate({ _id },
            { $set: editedData}, {new: true,upsert: true })
        res.status(200).send({ msg: 'groupe  updated successfully ...', updatedElement })
    } catch (error) {
        res.status(500).send({ msg: "unable to update groupe", error })
    }
}
export const deleteGroupe = async (req, res) => {
    try {
        const itemid = req.body.itemid
        await groupeModel.deleteOne({ _id: itemid })
        res.status(200).send({ msg: 'groupe deleted successfully ...' })
    } catch (error) {
        res.status(500).send({ msg: "impossible to delete groupe", error })
    }
}
export const getAllGroupe = async (req, res) => {
    try {
        const listGroupe = await groupeModel.find()
        .populate('admin')
        res.status(200).send(listGroupe)

    } catch (error) {
        res.status(500).send({ msg: "unable to get groupe", error })
    }
}