// declaration of the routes
const { Router } = require('express')
const router = Router()
const cors = require('cors')
const { startExtrationData } = require('../helpers/startExtrationData')


const corsOptions = {
    "origin": "*",
    "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
    "preflightContinue": false,
    "optionsSuccessStatus": 204
  }


//Using the routes
router.get('/hoteles', cors(corsOptions), async (req, res) => {
    
   // const { dataCheckIn, dataCheckOut, Month } = req.body

    console.log(req.body)
    
    await startExtrationData(08, 10, 04)
    res.send( JSON.stringify(DataResults) )
})

//Recibiendo datos desde el front



//exporting router
module.exports = {
    router
}