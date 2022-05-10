//Modules
const express = require('express');
const app = express() 
const morgan = require('morgan')
const cors = require('cors')
const port = process.env.PORT || 80;
const { router } = require('./router/index.router')

//Middlewars
app.use(morgan('dev'));
app.use(cors());



//Routes
app.use('/hoteles', router)


//Outros
app.listen(port, () => {
    console.log('Server ejecutandose en el puerto ' + port)
})

