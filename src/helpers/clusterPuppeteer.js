const { Cluster } = require('puppeteer-cluster');

const urls = require('../urls.json') // 
const { buscarFechasyReemplazarlas } = require('./searchAndReplace')


const clusterPuppeterScrapper = async (dayIn, dayOut, month) => {
    const cluster = await Cluster.launch({
        concurrency: Cluster.CONCURRENCY_CONTEXT,
        maxConcurrency: 6,
        monitor: true,
        puppeteerOptions: { 
            headless: true,
            args: ['--no-sandbox', '--disable-setuid-sandbox', '--use-gl=egl'],
            ignoreDefaultArgs: ['--disable-extensions'],
        },
       // timeout: 5000
    });

    const finalData = []

    /*
    const dataForSearch = {
        dayIn,
        dayOut,
        month,
    }
    */
    const urlsNewData = buscarFechasyReemplazarlas(
        dayIn,
        dayOut,
        month,
        urls)

    await cluster.task( async ({page, data: linksDinamicos }) => {
        await page.setViewport({
            width: 1920,
            height: 1080,
           
        });

        await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/72.0.3626.121 Safari/537.36')

        /*
        await page.setUserAgent('MyBrowser', {
            architecture: 'My1',
            mobile: false,
            model: 'Mybook',
            platform: 'MyOS',
            platformVersion: '3.1',
          });
          */

        await page.goto(linksDinamicos, {
            waitUntil: 'domcontentloaded',
        })

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
                const datos = selectorDOM == `TypeError: Cannot read properties of null (reading 'innerText')` || selectorDOM == null ? 'No hay precio para este dia' : selectorDOM
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

        finalData.push(data)
       
    })
   

    /* Creando cola de links y enviadolos a cluster.task */
    for ( let i = 0; i < urlsNewData.length ; i++ ) {
        let linksDinamicos = urlsNewData[i]
        cluster.queue(linksDinamicos)
    }


    await cluster.idle();
    await cluster.close();

    console.log(finalData)
    return finalData
}

module.exports = {
    clusterPuppeterScrapper
}