//
// Goal: Create a reusable function for getting the forecast
//
// 1. Setup the "forecast" function in utils/forecast.js
// 2. Require the function in app.js and call it as shown below
// 3. The forecast function should have three potential calls to callback:
//    - Low level error, pass string for error
//    - Coordinate error, pass string for error
//    - Success, pass forecast string for data (same format as from before)

const request=require('postman-request')

const forecast=(latitude,longitude,callback)=>
{
    console.log(latitude)
    console.log(longitude)


    const url ='http://api.weatherstack.com/current?access_key=d8b39c2ac8188d7577f09a4b6130018f&query='+ longitude + ','+ latitude + '&units=f'
     request({url,json:true},(error,{body})=>{
     if(error)
 {
         callback('unable to connect to the http request',undefined) // for network problem
}
     else if(body.error)
    {
         callback('unable to get location',undefined)
     }
     else{
    callback(undefined,{
        weather_descriptions:body.current.weather_descriptions,
        Temperature:body.current.temperature,
        feelslike:body.current.feelslike

    })
    
     //console.log(response.body.current.weather_descriptions+" .it is cuurently " +( response.body.current.temperature)  + " It feels likes " +( response.body.current.feelslike) +" degrees out")
    }
      })
    
}

module.exports=forecast

