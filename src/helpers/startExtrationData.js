const puppeteer = require('puppeteer');
const urls = require('../urls.json') // 
const { buscarFechasyReemplazarlas } = require('./searchAndReplace')

let DataResults = [];

const startExtrationData = async (dataCheckIn, dataCheckOut, month) => {
    const browser = await puppeteer.launch(
        {
            headless: true,
            args: ['--no-sandbox', '--disable-setuid-sandbox', '--use-gl=egl'],
         
        }
    );
    const page = await browser.newPage();

        await page.setViewport({
            width: 1920,
            height: 1080,
           
        });

        await page.setUserAgent('MyBrowser', {
            architecture: 'My1',
            mobile: false,
            model: 'Mybook',
            platform: 'MyOS',
            platformVersion: '3.1',
          });
    
    const versionB = await browser.version()

    
    const urlsNewData = buscarFechasyReemplazarlas(dataCheckIn, dataCheckOut, month, urls)

    console.log(urlsNewData)

  
        console.clear()
        console.log(`Começando a extração de dados de ${urlsNewData.length} estabelecimentos`)
        console.log(versionB)

        for (let i = 0; i < urlsNewData.length; i++) {
            await page.goto(urlsNewData[i], { waitUntil: 'domcontentloaded'});

          //  await page.screenshot({ path: './src/imgs/img1.jpeg', })
        
            console.log('')
    
            const data = await page.evaluate( async () => {    
                let textImg = document.querySelector('.bh-photo-grid [data-preview-image-layout] img')?.src
                let textHotel = document.querySelector('.hp__hotel-title h2')?.innerText
                let textLocalizacao = document.querySelector('.address .hp_address_subtitle')?.innerText
                let textSuite = document.querySelector('tbody tr .hprt-roomtype-link')?.innerText
                let textPontoacao = document.querySelector('.hp-gallery-review [data-review-score] [aria-label]')?.innerText
                let textCafedamanha = document.querySelector('tbody tr .hprt-table-cell .bui-list__body')?.innerText
                let textDiarias = document.querySelector(' [data-component] .sb-dates__los')?.innerText
                let textPrecototal = document.querySelector('tbody tr .hprt-price-block span')?.innerText
                
                function isaNull(selectorDOM) { 
                    const datos = selectorDOM == `TypeError: Cannot read properties of null (reading 'innerText')` || selectorDOM == null ? 'is a null' : selectorDOM
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
       
        }

    } 
 
   
    await browser.close();
    const dataHotel = JSON.stringify(DataResults) 
  
    return dataHotel
}

module.exports = {
    startExtrationData,
}