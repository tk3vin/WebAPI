const mongoose = require('mongoose'); 
const db="mongodb+srv://testing:testing12345678.@cluster0.fynllxf.mongodb.net/TestingDatabase?retryWrites=true&w=majority"; 
mongoose.connect(db).then(()=>{console.log("Connected to database"); 
}).catch(()=>{console.log("Error Connecting to database");})   
const heroSchema = new mongoose.Schema({   

countryName:{type:String},
countryCurrency:{type:String},
countryCapital:{type:String},
countryRegion:{type:String},
countryLang:{type:String},
localTime:{type:String},
region:{type:String},
temp:{type:String},
condition:{type:String},
lastUpdate:{type:String}

}); 

const Record=mongoose.model ( 'countries',heroSchema ); 

module.exports = Record ; 
