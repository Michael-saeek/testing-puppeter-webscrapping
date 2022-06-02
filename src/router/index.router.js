// declaration of the routes
const { Router } = require('express')
const router = Router()
const cors = require('cors')

const { getDataFromBooking, 

} = require('../controllers/scraperData')


const corsOptions = {
    "origin": "*",
    "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
    "preflightContinue": false,
    "optionsSuccessStatus": 200
  }


//Using the routes
router.get('/', cors(corsOptions), getDataFromBooking)

/*
router.post('/', cors(corsOptions), postData)
router.put('/', cors(corsOptions), putData)
router.delete('/', cors(corsOptions), deleteData)
*/






//exporting router
module.exports = {
    router
}