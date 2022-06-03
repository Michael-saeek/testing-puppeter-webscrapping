const { Router } = require('express')

const routesUsers = Router()


routesUsers.get('/', (req, res) => {
    res.render('login')
})

module.exports = routesUsers