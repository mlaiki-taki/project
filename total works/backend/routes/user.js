// require express
const express = require ('express')

// require Router
const router = express.Router()

// require model contact
const  userModel= require  ('../models/userModel')

// require controllers
const {  signin,signup,getRegions,changePassword,updateUserDetail,reactToPost,SetGroupConnection
} = require('../controllers/user.controller')




// ************** All routes **********************

/**
 * @desc : test route
 * @method : GET
 * @path : http://localhost:7000/api/contacts/test
 * @data : nothing
 * @acess : public
 */
router.get('/test', (req, res) => {
    res.status(200).send('Hello test')
})


/**
 * @desc : add user
 * @method : POST
 * @path : http://localhost:4001/api/users
 * @data : req.body
 * @acess : public
 */
 router.post('/signup', signup)


/**
 * @desc : login
 * @method : POST
 * @path : http://localhost:4001/api/users
 * @data : req.body
 * @acess : public
 */
 router.post('/signin', signin)

/**
 * @desc : get ListRegion
 * @method : GET
 * @path : http://localhost:4001/api/users
 * @data : req.body
 * @acess : public
 */
 router.get('/getRegions', getRegions)

/**
 * @desc : changePassword
 * @method : PUT
 * @path : http://localhost:4001/api/users
 * @data : req.body
 * @acess : public
 */
 router.put('/changePassword',  changePassword)

 /**
 * @desc : updateUserDetail
 * @method : PUT
 * @path : http://localhost:4001/api/users
 * @data : req.body
 * @acess : public
 */
  router.put('/updateUserDetail',  updateUserDetail)
 /**
 * @desc : updateUserDetail
 * @method : PUT
 * @path : http://localhost:4001/api/users
 * @data : req.body
 * @acess : public
 */
  router.put('/reactToPost',  reactToPost)
  
  /**
 * @desc : updateUserDetail
 * @method : PUT
 * @path : http://localhost:4001/api/users
 * @data : req.body
 * @acess : public
 */
   router.put('/SetGroupConnection',  SetGroupConnection)
  
  
module.exports = router