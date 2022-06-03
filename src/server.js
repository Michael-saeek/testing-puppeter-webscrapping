require('dotenv').config();

//Modules
const express = require('express');
const app = express() 
const morgan = require('morgan')
const cors = require('cors')
const { engine } = require('express-handlebars')
const path = require('path')
const port =  process.env.PORT || 80;
const routerGetData  = require('./router/index.routes')
const routesUsers  = require('./router/users.routes')


//settings
app.engine('.hbs', engine({
    extname: '.hbs',
    defaultView: 'default',
    layoutsDir: __dirname + '/views/layouts',
    partialsDir: __dirname + '/views/partials',
}))
app.set('view engine', '.hbs')
app.set('views', path.join(__dirname, 'views'))

//Middlewars
app.use(morgan('dev'));
app.use(cors());



//Routes
//?dayIn=13&dayOut=15&month=05 enviar querys para continuar
app.use('/', routesUsers)
app.use('/api', routerGetData)



//Outros
app.listen(port, () => {
    console.log('Server ejecutandose en el puerto ' + port)
})

