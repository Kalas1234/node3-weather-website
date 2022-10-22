const request=require('postman-request')
const geocode=(address,callback)=> //single reusable function we can use it many times as we need 
 {
 
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address)+ '.json?access_token=pk.eyJ1Ijoia2FsYXNoMzExIiwiYSI6ImNsOThnNm55MjJ0dGQzdmxmeXRwZjN0MXQifQ.EDnIusfE7DyaFQZq2H9OUw&limit=1'
 request({url,json:true},(error,{body})=>
 {
    if(error)
     {
        console.log(address);
 callback('unable to connect to http request',undefined)
    }
     else if(body.features.length===0)
    {
        console.log(address)
         callback('there is no such location please try again',undefined)
    }

     else
    {
        callback(undefined,{
         latittude:body.features[0].center[1],
             longitude:body.features[0].center[0],
             location:body.features[0].place_name
          
   })
}
    

    
 })

 }

 module.exports=geocode
