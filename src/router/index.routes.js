// declaration of the routes
const { Router } = require('express')
const routerGetData = Router()
const cors = require('cors')

const { getDataFromBooking, 

} = require('../controllers/scraperData')


const corsOptions = {
    "origin": "*",
    "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
    "preflightContinue": false,
    "optionsSuccessStatus": 200
  }

routerGetData.get('/', (req, res) => {

        res.render('home' )

    
})


//Using the routes
routerGetData.get('/startExtrationData', cors(corsOptions), getDataFromBooking)

/*
router.post('/', cors(corsOptions), postData)
router.put('/', cors(corsOptions), putData)
router.delete('/', cors(corsOptions), deleteData)
*/






//exporting router
module.exports = routerGetData