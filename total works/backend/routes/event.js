// require express
import express from 'express'

// require Router
const router = express.Router()



// require controllers
const {  getAllEvent,addEvent,deleteEvent,editEvent
} = require('../controllers/event.controller')




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
 * @desc : add event
 * @method : POST
 * @path : http://localhost:4001/api/events
 * @data : req.body
 * @acess : public
 */
 router.post('/addEvent', addEvent)
 /**
 * @desc : update event
 * @method : POST
 * @path : http://localhost:4001/api/events
 * @data : req.body
 * @acess : public
 */
  router.put('/update', editEvent)

  /**
 * @desc : delete event
 * @method : POST
 * @path : http://localhost:4001/api/events
 * @data : req.body
 * @acess : public
 */
   router.post('/delete', deleteEvent)

/**
 * @desc : test route
 * @method : GET
 * @path : http://localhost:7000/api/contacts/test
 * @data : nothing
 * @acess : public
 */
 router.get('/getEvents', getAllEvent)








module.exports = router