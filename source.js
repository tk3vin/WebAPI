const Record = require('./connect');
const express = require('express');
const app = express();
const axios = require('axios');
const apikey = '9389697c47de414d95f92323221411';
const country = 'Malaysia';
// var ObjectId = require('mongodb').ObjectID;
var countryName, countryCurrency, countryCapital, countryRegion, countryLang;
var localTime, temp, condition, lastUpdate, region;
 
    const querystr =`https://restcountries.com/v3.1/name/${country}`;
 
    axios.get(querystr).then( (response) =>{
        
        // console.log(response.data[0].name.official);
        // console.log(response.data[0].currencies);
        // console.log(response.data[0].capital);
        // console.log(response.data[0].region);
        // console.log(response.data[0].languages);
        const currencieArray = Object.values(response.data[0].currencies)
        const langArray = Object.values(response.data[0].languages);
        const capArray = Object.values(response.data[0].capital);
        countryName = response.data[0].name.official;
        countryCapital = capArray[0];
        countryRegion = response.data[0].region;
        countryLang = langArray[0];
        countryCurrency = currencieArray[0].name;


    
        const querystr =`http://api.weatherapi.com/v1/current.json?key=${apikey}&q=${country}`;
 
        axios.get(querystr).then( (response) =>{
            // console.log(response.data.location.localtime);
            // console.log(response.data.location.region);
            // console.log(response.data.current.temp_c);
            // console.log(response.data.current.condition.text);
            // console.log(response.data.current.last_updated);

            localTime = response.data.location.localtime;
            region = response.data.location.region;
            temp = response.data.current.temp_c;
            condition = response.data.current.condition.text;
            lastUpdate = response.data.current.last_updated;
        
         //Save to database
        countryData = new Record ({
 
            countryName:countryName,
            countryCurrency:countryCurrency,
            countryCapital:countryCapital,
            countryRegion:countryRegion,
            countryLang: countryLang,
            localTime:localTime,
            region:region,
            temp:temp,
            condition:condition,
            lastUpdate:lastUpdate
    
        });

 
        countryData
        .save()
        .then(result=> {
        console.log("Success" + result);
        }
        )
 
        .catch (error=> {
        console.log("Error" + error);
         }
 
         ); 
            
        }
        );
        
    }
    );

    app.get('/',(req, res)=> 
    {res.send("Country Name: " + countryName + 
    "<br>" + "Currency Use: " + countryCurrency + 
    "<br>" + "Capital City: " + countryCapital +
    "<br>" + "Country Region: " + countryRegion +
    "<br>" + "Languages Spoken: " + countryLang +
    "<br>" + "Local Time Now: " + localTime +
    "<br>" + "Current Temperature: " + temp +
    "<br>" + "Weather of City: " + region +
    "<br>" + "Current Weather Condition" + condition +
    "<br>" + "Last Update: " + lastUpdate );
    });

    app.listen(3000);