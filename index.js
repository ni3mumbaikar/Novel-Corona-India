const express = require('express');
const app = express()

const url = "https://www.mygov.in/covid-19"
var request = require('request-promise');
var cheerio = require('cheerio');
var response = '';
var active = '';
var deaths = '';
var discharged = '';
var migrated = '';

app.get('/', function (req, res) {
    res.send("Peace harry !")
})

app.get('/ni3mumbaikar', function (req, res) {
    res.send('Oh you got the developer name correct')
})


app.use(express.static('public'));
app.use(express.static(__dirname + '/public'));
app.set('view engine', 'ejs');
app.get('/covid-19-india', function (req, res) {
    track_covid().then(() => {
        res.render('presentor', {
            active: active,
            discharged: discharged,
            migrated: migrated,
            deaths: deaths
        })
    })
})

async function track_covid() {
    const reponse = await request({
        uri: url,
        headers: {
            accept: "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
            "accept-encoding": "gzip, deflate, br",
            "accept-language": "en-US,en;q=0.9,la;q=0.8"
        },
        gzip: true
    })

    const $ = cheerio.load(reponse)
    const active_cases = $('div[class="iblock active-case"] > div[class="iblock_text"] > span[class="icount"]').text();
    const discharge = $('div[class="iblock discharge"] > div[class="iblock_text"] > span[class="icount"]').text();
    const deaths_case = $('div[class="iblock death_case"] > div[class="iblock_text"] > span[class="icount"]').text();
    const migrants = $('div[class="iblock migared_case"] > div[class="iblock_text"] > span[class="icount"]').text();
    active = active_cases;
    discharged = discharge;
    deaths = deaths_case;
    migrated = migrants;
}

app.listen(process.env.PORT || 3000, () => console.log('Server is up and running'))
