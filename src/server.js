const express = require('express');
const app = express()  //Executando express 
const morgan = require('morgan')
const puppeteer = require('puppeteer');

app.set('port', 3000)
app.set('title', 'Test web-scrapping')
app.use(morgan('dev'));

app.get('/', async (request, response) => {

    try {
        const browser = await puppeteer.launch(
            {
                headless: true,
                args: [ // Disable Chromium's unnecessary SUID sandbox.
                    '--no-sandbox',
                    '--disable-setuid-sandbox',
                ]
            }
        )
        const page = await browser.newPage();
        await page.goto(`https://www.booking.com/searchresults.es.html?ss=Centro%20de%20B%C3%BAzios&ssne=Centro%20de%20B%C3%BAzios&ssne_untouched=Centro%20de%20B%C3%BAzios&label=gog235jc-1DCAEoggI46AdIClgDaCCIAQGYAQq4AQbIAQzYAQPoAQH4AQKIAgGoAgO4AsyBqJEGwAIB0gIkZGQwMDdjYzgtNWQ0ZS00MTgwLThjYTktMDk2Y2QyODA3YTRk2AIE4AIB&sid=5b27a9f97c9ae14d33519b42c28a6961&aid=397594&lang=es&sb=1&src_elem=sb&src=searchresults&dest_id=3167&dest_type=district&checkin=2022-03-11&checkout=2022-03-13&group_adults=2&no_rooms=1&group_children=0&sb_travel_purpose=leisure`)
    //  await page.screenshot({ path: 'example.png' });  esse codigo aqui tira uma foto do site

        const pageContent = await page.evaluate(() => {
            return {
                hotel: document.querySelector('.fde444d7ef').innerHTML,
             
                localizacao: document.querySelector('.af1ddfc958').innerHTML,
                   /*
                suite: document.querySelector('._c5d12bf22').innerHTML,
                pontoacao: document.querySelector('._9c5f726ff').innerHTML,
                cafedamanha: document.querySelector('.c79699a040').innerHTML,
                diarias: document.querySelector('._4abc4c3d5').innerHTML,
                precoTotal: document.querySelector('._e885fdc12').innerHTML,
                */
          
                totaldeEstabelecimentos: document.querySelector('._30227359d').innerHTML,
            }
        })  
                console.log(pageContent)
                const novoQuery = JSON.stringify(pageContent)
            
                await browser.close();
                
             

        response.send(` ${novoQuery}`)
    } 
    
    catch (e) {
        console.log(`Mensaje de error: ${e}`)
    }
})

app.listen(3000, () => {
    console.log(`Servidor inicializado y escuchando desde el puerto 3000`)
})

