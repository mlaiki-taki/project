// require express
import express from 'express'

// require Router
const router = express.Router()

// require controllers

import {getAllGroupe,addGroupe,deleteGroupe,editGroupe} from '../controllers/groupe.controller'



// ************** All routes **********************

/**
 * @desc : test route
 * @method : GET
 * @path : http://localhost:7000/api/groupes/test
 * @data : nothing
 * @acess : public
 */
router.get('/test', (req, res) => {
    res.status(200).send('Hello test')
})


/**
 * @desc : add groupe
 * @method : POST
 * @path : http://localhost:4001/api/groupes
 * @data : req.body
 * @acess : public
 */
 router.post('/addgroupe', addGroupe)
 /**
 * @desc : update groupe
 * @method : POST
 * @path : http://localhost:4001/api/groupes
 * @data : req.body
 * @acess : public
 */
  router.put('/updategroup', editGroupe)

  /**
 * @desc : delete groupe
 * @method : POST
 * @path : http://localhost:4001/api/groupes
 * @data : req.body
 * @acess : public
 */
   router.post('/delete', deleteGroupe)

/**
 * @desc : groue list 
 * @method : GET
 * @path : http://localhost:7000/api/groupes
 * @data : nothing
 * @acess : public
 */
 router.get('/getGroupes', getAllGroupe)








module.exports = router