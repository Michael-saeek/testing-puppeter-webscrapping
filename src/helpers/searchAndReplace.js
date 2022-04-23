const urls = require('../urls.json')
//indexOf  buscar algun valor esto retorna un numero
//slice  puedes extraer un texto dentro de un string grande sabiendo los valores,
//replace  buscas una string y lo reemplazas por otro

const buscarFechasyReemplazarlas = (dataCheckIn, dataCheckOut, month, links) => {
    const arrayModificado = links.map( (item) => {

        //console.log(newUrlWithParameters.slice('272', '310'))
         return item.url.replace(`checkin=2022-04-01&checkout=2022-04-03`, `checkin=2022-${month}-${dataCheckIn}&checkout=2022-${month}-${dataCheckOut}`)
    })

    return arrayModificado
}



//buscarFechasyReemplazarlas(03, 06, 04, urls)

module.exports = {
    buscarFechasyReemplazarlas,
}