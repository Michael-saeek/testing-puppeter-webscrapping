const { startExtrationData } = require('../helpers/startExtrationData')
//Separação da logica dos metodos HTTP


//GET 
const getExtrationData = async (req, res) => {

    const { dayIn, dayOut, month } = req.query
 
    //?dayIn=13&dayOut=15&month=05 enviar querys para continuar
    const dataHotels = await startExtrationData(dayIn, dayOut, month)
    res.send(dataHotels)
}

const postData = (req, res) => {

}

const putData = (req, res) => {
    
}

const deleteData = (req, res) => {
    
}

module.exports = {
    getExtrationData,
    postData,
    putData,
    deleteData
}