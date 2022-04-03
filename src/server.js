const express = require('express');
const app = express()  //Executando express 
const morgan = require('morgan')
const cors = require('cors')
const puppeteer = require('puppeteer');
const urls = require('./urls.json') // 
const port = 3000;
const { buscarFechasyReemplazarlas } = require('./helpers/searchAndReplace')


let corsOptions = {
    "origin": "*",
    "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
    "preflightContinue": false,
    "optionsSuccessStatus": 204
  }

let DataResults = [];

app.use(morgan('dev'));
app.use(cors());

app.get('/hoteles', cors(corsOptions), async (req, res) => {
    await startExtrationData(15, 17, 04)
    res.send( DataResults )
})

const startExtrationData = async (dataCheckIn, dataCheckOut, month) => {
    const browser = await puppeteer.launch(
        {
            headless: false,
        }
    );
    const page = await browser.newPage(
        {
            waitUntil: 'domcontentLoaded'
        }
    );


    const urlsNewData = buscarFechasyReemplazarlas(dataCheckIn, dataCheckOut, month, urls)
    try {
        console.clear()
        console.log(`Começando a extração de dados de ${urlsNewData.length} estabelecimentos`)

        for (let i = 0; i < urlsNewData.length; i++) {
            
            console.log({ urlsNewData: urlsNewData[i]})
            await page.goto(urlsNewData[i]);

            console.log('')
            console.log(`Pagina numero ${[i]}`)

        
            const data = await page.evaluate(() => {    
                let textImg = document.querySelector('.bh-photo-grid [data-preview-image-layout] img')?.src
                let textHotel = document.querySelector('.hp__hotel-title h2')?.innerText
                let textLocalizacao = document.querySelector('.address .hp_address_subtitle')?.innerText
                let textSuite = document.querySelector('tbody tr .hprt-roomtype-link')?.innerText
                let textPontoacao = document.querySelector('.hp-gallery-review [data-review-score] [aria-label]')?.innerText
                let textCafedamanha = document.querySelector('tbody tr .hprt-table-cell .bui-list__body')?.innerText
                let textDiarias = document.querySelector(' [data-component] .sb-dates__los')?.innerText
                let textPrecototal = document.querySelector('tbody tr .hprt-price-block span')?.innerText
                
                function isaNull(selectorDOM) {
                    const datos = selectorDOM == `TypeError: Cannot read properties of null (reading 'innerText')` || selectorDOM == null ? 'Valor não encontrado' : selectorDOM
                    return datos
                }

                return {
                    backgroundImg: isaNull(textImg),
                    hotel: isaNull(textHotel),
                    localizacao: isaNull(textLocalizacao),
                    suite: isaNull(textSuite),
                    pontoacao: isaNull(textPontoacao),
                    cafedamanha: isaNull(textCafedamanha),
                    diarias: isaNull(textDiarias),  
                    precoTotal: isaNull(textPrecototal),     
                }
            })


           DataResults.push(data)
           console.log(data) 
           console.log(``)
           console.log(`-------------->`)
            //const dataHotel = JSON.stringify(data) 
        }

        console.log(DataResults)

    } 

    catch (error) {
        console.log(`Este es el error: ${error}`)
    }
   
    await browser.close();
}

//startExtrationData(08, 10, 04)


app.listen(port, () => {
    console.log('Server ejecutandose en el puerto ' + port)
})