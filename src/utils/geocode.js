const request = require('request')
const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiYmhhd2FuYWdhdXIxNDMiLCJhIjoiY2txaTEwcGpvMGdkbDJ1cWpobW51cDVsdSJ9.0oOhyEsx-eUjiO2ddhKQFQ&limit=1'
    // destruct the url and response and change according to this
    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Uable to find location service!', undefined)
        } else if (body.features.length === 0) {
            callback('Unable to find location.Please try again!!!', undefined)
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],       //  ||
                longitude: body.features[0].center[0],      //removed response
                location: body.features[0].place_name       //  ||
            })
        }
    })
}

module.exports = geocode



//Raw code for geolocation

// const geoLocation = 'https://api.mapbox.com/geocoding/v5/mapbox.places/Narnaul.json?access_token=pk.eyJ1IjoiYmhhd2FuYWdhdXIxNDMiLCJhIjoiY2txaTEwcGpvMGdkbDJ1cWpobW51cDVsdSJ9.0oOhyEsx-eUjiO2ddhKQFQ&limit=1'

// request({ url: geoLocation, json: true }, (error, response) => {
//   if (error) {
//     console.log('Unable to connect to the map service.Please check your network connection');
//   } else if (response.body.features.length===0) {
//     console.log('Unable to find location.Please check your magnitudes.');
//   } else {
//     const lat = response.body.features[0].center[1]
//     const long = response.body.features[0].center[0]
//     console.log(`Latitude : ${lat}`);
//     console.log(`Longitude : ${long}`);
//     console.log(response.body.features[0].place_name);

//   }
// })