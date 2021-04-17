// require express
import express from 'express'

// require Router
const router = express.Router()

// require model contact
import  commentModel  from '../models/commentModel'

// require controllers

import {getAllComment,addComment,deleteComment,editComment,getCommentByPostId} from '../controllers/Comment.controller'



// ************** All routes **********************

/**
 * @desc : test route
 * @method : GET
 * @path : http://localhost:7000/api/Comments/test
 * @data : nothing
 * @acess : public
 */
router.get('/test', (req, res) => {
    res.status(200).send('Hello test')
})


/**
 * @desc : add Comment
 * @method : Comment
 * @path : http://localhost:4001/api/Comments
 * @data : req.body
 * @acess : public
 */
 router.post('/addComment', addComment)
 /**
 * @desc : update Comment
 * @method : Comment
 * @path : http://localhost:4001/api/Comments
 * @data : req.body
 * @acess : public
 */
  router.put('/updateComment', editComment)

  /**
 * @desc : delete Comment
 * @method : Comment
 * @path : http://localhost:4001/api/Comments
 * @data : req.body
 * @acess : public
 */
   router.post('/deleteComment', deleteComment)

/**
 * @desc : Comment list 
 * @method : GET
 * @path : http://localhost:7000/api/Comments
 * @data : nothing
 * @acess : public
 */
 router.get('/getCommentByPostId', getCommentByPostId)








module.exports = router