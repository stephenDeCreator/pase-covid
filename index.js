const express = require('express');

const Case = require('./database')
require('./runner');
const app = express();


const url = 'https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_daily_reports/05-05-2020.csv'

app.get('/', (req, res) => {
    const country = req.query.country;
    const date = req.query.date;

    if (country && date) {
        Case.find({Country: country, Date: date}, (err, docs) => {
            if (err) {
                return res.send().status(400)
            }
            return res.json(docs).status(200);
        });
    }

    else if (country) {
        Case.find({Country: country}, (err, docs) => {
            if (err) {
                return res.send().status(400)
            }
            return res.json(docs).status(200);
        });
    }else if(date) {
        Case.find({Date: date}, (err, docs) => {
            if (err) {
                return res.send().status(400)
            }
            return res.json(docs).status(200);
        });
    } else {
        Case.find((err, docs) => {
            if (err) {
                return res.send().status(400);
            }
            return res.json(docs).status(200);
        });
    }
    
});


app.listen(8000, () => {
    console.log('Server up and running...');
});