const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();
const port = process.env.PORT || 3000;

//Define path for Express Config
const publicDirectoryPath = path.join(__dirname,'../public');
const viewsPath = path.join(__dirname,'../templates/views');
const partialsPath = path.join(__dirname,'../templates/partials');

//Setup handlebars engine and views location
app.set('view engine','hbs');
app.set('views',viewsPath);
hbs.registerPartials(partialsPath);

//Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get('',(req,res)=>{
  res.render('index',{
    title:'Weather',
    name:'Avani'
  });
});

app.get('/weather',(req,res)=>{
  if(!req.query.address){
    return res.send({
      error:'Please provide an address'
    });
  }
  address = req.query.address;
  geocode(address,(error,{latitude,longitude,location}={})=>{
    if(error){
      return res.send({
        error
      });
    }
    forecast(latitude,longitude,(error,{weather,temperature,feelslike,humidity}={})=>{
      if(error){
        return res.send({
          error
        });
      }
      res.send({
        location,
        weather,
        temperature,
        feelslike,
        humidity,
      });
    });
  });
});

app.get('*',(req,res)=>{
  res.render('error',{
    title:'404',
    errorMessage:'Page not found!',
    name:'Avani'
  });
});

app.listen(port, ()=>{
  console.log('Server is up on port '+port);
});


