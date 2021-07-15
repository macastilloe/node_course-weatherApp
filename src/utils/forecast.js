const request = require('request')


const forecast = (lat, long, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=59a617708a1d255f7d2219709e49c194&query='+long+','+lat+'&units=m'
    request({url, json: true}, (error, {body}) =>{

        if(error){
            callback('Unable to connect', undefined)

        }else if(body.error){
            callback(body.error.info, undefined)

        }else{
            console.log(body.current)
            callback(undefined, 'Temperature is '+body.current.temperature+'°C, but it feels like '+body.current.feelslike+'°C. \nThe humidity is '
            +body.current.humidity+' and the description of the weather is: '+(body.current.weather_descriptions[0]||'No description')+'.')

        }
    })
    
    
    

}


module.exports = forecast