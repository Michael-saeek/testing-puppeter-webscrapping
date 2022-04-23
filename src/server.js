//Modules
const express = require('express');
const app = express() 
const morgan = require('morgan')
const cors = require('cors')
const port = 80;
const { router } = require('./router/index')


//Middlewars
app.use(morgan('dev'));
app.use(cors());



//Routes
app.use('/index', router)


//Outros
app.listen(port, () => {
    console.log('Server ejecutandose en el puerto ' + port)
})

