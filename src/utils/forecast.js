const axios = require("axios")
const forecast = (lat, lon, callback) => {
    const url = 'https://api.openweathermap.org/data/2.5/weather?lat=' + encodeURIComponent(lat) + '&lon=' + encodeURIComponent(lon) + '&limit=1&units=metric&appid=f9984aea7124c81ef04e9798339be580'

    axios.get(url).then(res => {
        const {temp, feels_like,humidity}= res.data.main
        callback(undefined, "it is currently "+temp+" degrees out, feels like "+feels_like+" degrees. humifity at "+humidity+"%.")
    }).catch(error => {
        if (error.response !== undefined) {
            callback("unable to find location", undefined)
        }
        else {
            callback("unable to connect to location services", undefined)
            // console.log(error)
        }
    })
}

module.exports = forecast