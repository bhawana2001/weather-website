const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=628f0a975bba636c7cfc1c152c8b9acb&query=' + latitude + ',' + longitude + '&units=m'
    // destruct the url and response and change according to this
    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (body.error) {        //response.body to body
            callback('Unable to find location', undefined)
        } else {
            callback(undefined, body.current.weather_descriptions[0] +". It is currently " + body.current.temperature + "° degress out."+" Humidity is "+body.current.humidity+"%. It feels like "+body.current.feelslike+"% chances of rain and visibility is "+body.current.visibility+" km. Pressure is "+body.current.pressure+".")
        }
    })
}

module.exports = forecast


//Raw code for forecast

// const url='http://api.weatherstack.com/current?access_key=628f0a975bba636c7cfc1c152c8b9acb&query=28.04444,76.10833&units=f'

// request({ url: url,json:true},(error,response)=>{
//    if(error){
//       console.log('Unable to connect to weather service.');
//    }else if(response.body.error){
//     console.log('Unable to find temperature');
//    }else{
//    console.log(response.body.current.weather_descriptions[0]);
//   console.log(`It is currently ${response.body.current.temperature} degrees out. There is a ${response.body.current.feelslike} chance of rain.`);
// }
// })
