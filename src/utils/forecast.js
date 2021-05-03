const request = require('request');
const forecast = (latitude,longitude,callback) => {
  const url = `http://api.weatherstack.com/current?access_key=ee2d54568e91e518ba3f87a44d789345&query=${latitude},${longitude}`;
  request({url,json:true},(error,{body}={})=>{
    if(error){
      callback('Unable to connect to the weather service!',undefined);
    }
    else if(body.error){
      callback('Unable to find location',undefined);
    }
    else{
      callback(undefined,{
        weather:body.current.weather_descriptions[0],
        temperature:body.current.temperature,
        feelslike:body.current.feelslike,
        humidity:body.current.humidity,
      });
    }
  });
}
module.exports = forecast;