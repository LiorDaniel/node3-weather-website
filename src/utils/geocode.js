const axios= require("axios")
const geocode = (adress, callback) => {
    const url = 'https://api.openweathermap.org/geo/1.0/direct?q=' + encodeURIComponent(adress) + '&limit=1&appid=f9984aea7124c81ef04e9798339be580'
 
    axios.get(url).then(res => {
       if (res.data.length === 0) {
          callback("unable to find location", undefined)
       }
       else {
          const {lat,lon,name}=res.data[0]
          callback(undefined, {
             lat,lon,name
          })
         
       }
    }).catch(error => {
      //  callback("unable to connect to location services", undefined)
      console.log(error)
    })
 }

 module.exports= geocode