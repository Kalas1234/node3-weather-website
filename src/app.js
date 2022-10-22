const path=require('path')
const express=require('express')
const hbs=require('hbs')  // we have to load hbs and configure it to use partials.
const geocode=require('./utils/geocode')
const forecast=require('./utils/forecast')







const app=express()
//define path for express config
const directoryPath=path.join(__dirname,'../public')
const viewsPath=path.join(__dirname,'../templates/views')
const partialPath=path.join(__dirname,'../templates/partials')
//define  handlebars engine and views location

app.set('view engine','hbs')  // integrate handlebar into express
app.set('views',viewsPath)
hbs.registerPartials(partialPath)
//setup static directory to serrve
app.use(express.static(directoryPath))
//console.log(__filename)
app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather',
        name:'kalash'
    })
 })
 app.get('/about',(req,res)=>{
    res.render('about',{
        title:'about page',
        name:'kalash'
        
    })
 })

app.get('/help',(req,res)=>{
      res.render('help',{
        message:'this is a help page',
        title:'help page',
        name:'kalash'
      })
}) 
//404 pages 
app.get('/help/*',(req,res)=>
{
    res.render('404',{
        error:'help page not found'
    })
})
app.get('/products',(req,res)=>{
   // console.log(req.query)
   if(!req.query.search)
   {
   return  res.send({
        error:"you must provided a search term"

    })
}

   

    res.send({
        products:[]
    })
})
app.get('/weather',(req,res)=>{
    if(!req.query.address)
    {
        return res.send({
error:"please provide address"
        })

    }
geocode(req.query.address,(error,{latitude,longitude,location}={})=> // object destructuring
    {
           if(error)
    {
        return res.send({
            error
        })
    }
    forecast(latitude,longitude,(error,forecastData)=>
    {
        if(error)
        {
           return res.send(
                {
                   error  // object shorthand
                }
            )
        }
res.send({
    forecast:forecastData,
    location,
    address:req.query.address


})
    })
    })

    // res.send({
    //     forecast:50,
    //     address:req.query.address

    // })
    
})
app.get('/*',(req,res)=>
{
    res.render('404',{
        error:'page not found'
    })
})

app.listen(3000,()=>
{
    console.log('server is running up on port 3000!')
})

