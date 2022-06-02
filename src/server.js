//Modules
const express = require('express');
const app = express() 
const morgan = require('morgan')
const cors = require('cors')
const port = 3000 || 80;
const { router } = require('./router/index.router')

//Middlewars
app.use(morgan('dev'));
app.use(cors());



//Routes
//?dayIn=13&dayOut=15&month=05 enviar querys para continuar
app.use('/startExtrationData', router)


//Outros
app.listen(port, () => {
    console.log('Server ejecutandose en el puerto ' + port)
})

