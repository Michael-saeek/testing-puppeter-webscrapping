// declaration of the routes
const { Router } = require('express')
const router = Router()
const cors = require('cors')
const { 
  getExtrationData, 
  /*
  postData, 
  putData,
  deleteData 
  */
} = require('../controllers/extration')


const corsOptions = {
    "origin": "*",
    "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
    "preflightContinue": false,
    "optionsSuccessStatus": 200
  }


//Using the routes
router.get('/', cors(corsOptions), getExtrationData)

/*
router.post('/hoteles', cors(corsOptions), postData)
router.put('/hoteles', cors(corsOptions), putData)
router.delete('/hoteles', cors(corsOptions), deleteData)
*/






//exporting router
module.exports = {
    router
}