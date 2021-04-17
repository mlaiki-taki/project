import postModel from "../models/postModel"


/**
 * POST handler
 *  */
export const addPost = async (req, res) => {
    try {
        const created_at = new Date()
        const { text, comments, comment_amount, like_ammount, media, author, groupe } = req.body
        // create and save the new user
        const newPost = new postModel({ text, comments, comment_amount, like_ammount, media, author, groupe, created_at })
        await newPost.save()
        res.status(200).send({ msg: 'Post added successfully ...', newPost })
    } catch (error) {
        res.status(500).send({ msg: "impossible to add new Post", error })
    }
}
export const editPost = async (req, res) => {
    try {
        const { _id, editedData } = req.body
        console.log(_id, editedData)
        const updatedElement = await postModel.findOneAndUpdate({ _id },
            { $set: editedData }, { new: true, upsert: true })
        res.status(200).send({ msg: 'Post  updated successfully ...', updatedElement })
    } catch (error) {
        res.status(500).send({ msg: "unable to update Post", error })
    }
}
export const deletePost = async (req, res) => {
    try {
        const itemid = req.body.itemid
        await postModel.deleteOne({ _id: itemid })
        res.status(200).send({ msg: 'Post deleted successfully ...' })
    } catch (error) {
        res.status(500).send({ msg: "impossible to delete Post", error })
    }
}
export const getAllPost = async (req, res) => {
    try {
        const listPost = await postModel.find({})
            .sort({ created_at: -1 })
            .populate('author')
        res.status(200).send(listPost)

    } catch (error) {
        res.status(500).send({ msg: "unable to get Post", error })
    }
}
export const getPostsByGroupId = async (req, res) => {
    try {
        const { groupe } = req.params
        const MyPosts = await postModel.find({ groupe })
            .sort({ created_at: -1 })
            .populate('author')
            .populate('comments')
            res.status(200).send(MyPosts)

    } catch (error) {
        res.status(500).send({ msg: "unable to get Post", error })
    }
}
