const { clusterPuppeterScrapper } = require('../helpers/clusterPuppeteer')
//Separação da logica dos metodos HTTP


//GET 
const getDataFromBooking = async (req, res) => {

    try {
        const { dayIn, dayOut, month } = req.query
        const dataHotels = await clusterPuppeterScrapper(dayIn, dayOut, month)
        res.send(dataHotels)

    } catch (error) {
        console.log('Este es el error: ', error)
    }
}




module.exports = {
    getDataFromBooking,

}