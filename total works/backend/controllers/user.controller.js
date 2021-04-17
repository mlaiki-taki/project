import jwt from 'jsonwebtoken';
import userModel from "../models/userModel"
import regionEnum from '../enum/regionEnum'
import postModel from "../models/postModel"

const createToken = data => (
  jwt.sign({ data }, process.env.JWT_PRIVATE_KEY, {
    expiresIn: 18000000000
  })
)


const UsertoArray = (user) => {
  return {
    _id: user._id,
    email: user.email,
    name: user.name,
    avatar: user.avatar,
    region: user.region,
    mobilePhone: user.mobilePhone,
    likedPost: user.likedPost,
    connectedGroup: user.connectedGroup
  }
}
/**
 * POST handler
 *  */
export const signup = async (req, res) => {
  try {
    console.log(req.body)
    const { name, email, mobilePhone, region, password } = req.body
    // handling errors : test if contact already exist with email
    let newUser = await userModel.findOne({ email })
    if (newUser) {
      res.status(400).send({ msg: 'User already exist ( email is unique ) !!!' })
      return;
    }
    // create and save the new user
    newUser = new userModel({ name, email, mobilePhone, password, region })
    await newUser.save()
    const token = createToken(UsertoArray(newUser))
    res.status(200).send({ msg: 'user added successfully ...', token })
  } catch (error) {
    res.status(500).send({ msg: "impossible to add new user", error })
  }
}




export const signin = async (req, res) => {
  try {
    const { login, password } = req.body
    // handling errors : test if contact already exist with email
    const user = await userModel.findOne({ $or: [{ email: login }, { mobilePhone: login }], password })
    if (user) {
      const token = createToken(UsertoArray(user))
      res.status(200).send({ token })
      return;
    }
    else res.status(401).send("passwor or email errone")
  } catch (error) {
    res.status(500).send({ msg: "impossible to log in", error })
  }
}
export const getRegions = async (req, res) => {
  try {
    res.status(200).send(await regionEnum())
  } catch (error) {
    res.status(500).send({ msg: "impossible to add new user", error })
  }
}
export const updateUserDetail = async (req, res) => {
  try {
    const { _id, editedData } = req.body
    const updatedElement = await userModel.findOneAndUpdate({ _id },
      { $set: editedData }, { new: true, upsert: true })
    console.log(updatedElement)
    const token = createToken(UsertoArray(updatedElement))
    res.status(200).send({ msg: 'user  updated successfully ...', token })
  } catch (error) {
    res.status(500).send({ msg: "unable to update user", error })
  }
}
export const changePassword = async (req, res) => {
  try {
    const { _id, newPass, oldPass } = req.body
    const user = await userModel.findOne({ _id })
    const curenPass = user.password
    if (curenPass == oldPass) {
      console.log('test')
      await userModel.findOneAndUpdate({ _id },
        { $set: { password: newPass } }, { new: true, upsert: true })
      res.status(200).send({ msg: 'user  updated successfully ...' })
    }
    else res.status(401).send({ msg: "curent Passwor not correct" })
  } catch (error) {
    res.status(500).send({ msg: "unable to update user", error })
  }
}
export const reactToPost = async (req, res) => {
  try {
    const { post_id, reaction, user } = req.body
    const setCondition = reaction ? { $push: { likedPost: post_id } } : { $pull: { likedPost: post_id } }
    const updatedUser = await userModel.findOneAndUpdate({ _id: user },
      setCondition, { new: true, upsert: true })
    console.log(req.body)
    const post = await postModel.findOne({ _id: post_id })
    const curentLikes = post.like_ammount
    await postModel.findOneAndUpdate({ _id: post_id },
      { $set: { like_ammount: reaction ? curentLikes + 1 : (curentLikes > 1 ? curentLikes - 1 : 0) } }, { new: true, upsert: true })
    const token = await createToken(UsertoArray(updatedUser))
    res.status(200).send({ token })

  } catch (error) {
    res.status(500).send({ msg: "unable to get Post", error })
  }
}

export const SetGroupConnection = async (req, res) => {
  try {
    const { status, user, group_id } = req.body
    const userElmt = await userModel.findOne({ _id: user, connectedGroup: { $elemMatch: { groupe: group_id } } })
    let updatedUser
    if (userElmt) {
      console.log(status, user, group_id)
      updatedUser = await userModel.findOneAndUpdate({ _id: user, "connectedGroup.groupe": group_id },
        { $set: { "connectedGroup.$.connectedStatus": status } }, { new: true, upsert: true })
    }
    else {
      updatedUser = await userModel.findOneAndUpdate({ _id: user },
        { $push: { connectedGroup: { groupe: group_id, connectedStatus: status } } }, { new: true, upsert: true })
    }
    const token = await createToken(UsertoArray(updatedUser))
    res.status(200).send({ token })

  } catch (error) {
    res.status(500).send({ msg: "unable to get Post", error })
  }
}

