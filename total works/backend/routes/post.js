// require express
import express from 'express'

// require Router
const router = express.Router()

// require controllers

import {getAllPost,getPostsByGroupId,addPost,deletePost,editPost} from '../controllers/post.controller'



// ************** All routes **********************

/**
 * @desc : test route
 * @method : GET
 * @path : http://localhost:7000/api/Posts/test
 * @data : nothing
 * @acess : public
 */
router.get('/test', (req, res) => {
    res.status(200).send('Hello test')
})


/**
 * @desc : add Post
 * @method : POST
 * @path : http://localhost:4001/api/Posts
 * @data : req.body
 * @acess : public
 */
 router.post('/addPost', addPost)
 /**
 * @desc : update Post
 * @method : POST
 * @path : http://localhost:4001/api/Posts
 * @data : req.body
 * @acess : public
 */
  router.put('/updatepost', editPost)

  /**
 * @desc : delete Post
 * @method : POST
 * @path : http://localhost:4001/api/Posts
 * @data : req.body
 * @acess : public
 */
   router.post('/deletepost', deletePost)

/**
 * @desc : post list 
 * @method : GET
 * @path : http://localhost:4001/api/Posts
 * @data : nothing
 * @acess : public
 */
 router.get('/getPosts', getAllPost)
 
/**
 * @desc : My posts lists 
 * @method : GET
 * @path : http://localhost:4001/api/Posts
 * @data : nothing
 * @acess : public
 */
 router.get('/getPostsByGroupId/:groupe', getPostsByGroupId)








module.exports = router