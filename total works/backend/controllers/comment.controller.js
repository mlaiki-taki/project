import commentModel from "../models/commentModel"
import postModel from "../models/postModel"


/**
 * Comment handler
 *  */
export const addComment = async (req, res) => {
    console.log(req.body)
    const created_at = new Date()
    try {
        const { text, author, post } = req.body
        // create and save the new user
        const newComment = new commentModel({ text, author, post, created_at })
        const savedComment = await newComment.save()
        console.log("savedComment",savedComment)
        await postModel.findOneAndUpdate({ _id:post },
            { $push: { comments: savedComment._id } }, { $inc: { comment_amount: 1 } })
        res.status(200).send({ msg: 'Comment added successfully ...', newComment })
    } catch (error) {
        res.status(500).send({ msg: "impossible to add new Comment", error })
    }
}
export const editComment = async (req, res) => {
    try {
        const { _id, editedData } = req.body
        console.log(_id, editedData)

        const updatedElement = await commentModel.findOneAndUpdate({ _id },
            { $set: editedData }, { new: true, upsert: true }).populate('author')

        res.status(200).send({ msg: 'Comment  updated successfully ...', updatedElement })

    } catch (error) {
        res.status(500).send({ msg: "unable to update Comment", error })
    }
}
export const deleteComment = async (req, res) => {
    try {
        const itemid = req.body.itemid
        await commentModel.deleteOne({ _id: itemid })
        await postModel.findOneAndUpdate({ post },
            { $pull: { comments: itemid } }, { $inc: { comment_amount: -1 } })
        res.status(200).send({ msg: 'Comment deleted successfully ...' })
    } catch (error) {
        res.status(500).send({ msg: "impossible to delete Comment", error })
    }
}
export const getCommentByPostId = async (req, res) => {
    try {
        const listComment = await commentModel.find({ post: req.params.postId })
            .populate('author')
        res.status(200).send(listComment)

    } catch (error) {
        res.status(500).send({ msg: "unable to get Comment", error })
    }
}