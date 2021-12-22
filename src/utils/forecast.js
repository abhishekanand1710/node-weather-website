const request = require('request')

//
// Goal: Create a reusable function for getting the forecast
//
// 1. Setup the "forecast" function in utils/forecast.js
// 2. Require the function in app.js and call it as shown below
// 3. The forecast function should have three potential calls to callback:
//    - Low level error, pass string for error
//    - Coordinate error, pass string for error
//    - Success, pass forecast string for data (same format as from before)


// const url = 'http://api.weatherstack.com/current?access_key=90968986220ecac77c37ea667cf80f86&query=37.8267,-122.4233&units=f'

// request({ url: url, json: true }, (error, response) => {
//     const data = response.body.current
//     console.log(data.weather_descriptions[0] + ". The current temperature is - " + data.temperature + ". Feels like - " + data.feelslike + " out.")
// })

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=90968986220ecac77c37ea667cf80f86&query=' + latitude + ',' + longitude + '&units=f'

    request({url: url, json: true},  (error, response) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (!response.body.current) {
            callback('Unable to find weather. Try another search.', undefined)
        } else {
            data = response.body.current
            callback(undefined, {
                forecast: data.weather_descriptions[0] + ". The current temperature is - " + data.temperature + ". Feels like - " + data.feelslike + " out"
            })
        }
    })
}

module.exports = forecast

