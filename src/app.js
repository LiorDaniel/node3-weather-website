const path= require('path')
const express= require('express')
const hbs= require('hbs')
const geocode= require('./utils/geocode')
const forecast= require('./utils/forecast')
const app= express()
const port= process.env.PORT || 3000
// configuring paths for express
const viewsPath= path.join(__dirname,'../templates/views')
const staticFolderPath= path.join(__dirname,'../public')
const partialsPath =path.join(__dirname,'../templates/partials')

//setup for handlebars
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

//setup static directory to serve
app.use(express.static(path.join(__dirname,'../public')))


app.get('',(req,res)=>{
    res.render('index',{
        title:"Weather",
        name:"Lior Daniel"
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title:"About",
        name:"Lior Daniel"
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        title:'Help',
        name:'Lior Daniel',
        message:"this is the answer to the thing you needed help with"
    })
})

app.get('/weather',(req,res)=>{
    if(!req.query.adress){
        return res.send({
            error:"you must provide an adress"
        })
    }
    geocode(req.query.adress, (error, {lat,lon,name}={}) => {
  
        if(error===undefined){ 
        forecast(lat,lon,(error,forecastData)=>{
          
           if(error===undefined){ 
               res.send({
                   forecast:forecastData,
                   location:name,
                   adress:req.query.adress
               })
             
                 }
                 else{
                     return res.send({error}) 
                 }
        })
        }
        else{
           return res.send({error})
        }
     })

    // res.send({
    //     temp:5,
    //     adress:req.query.adress,
    //     location:"philadelphia"
    // })
})

app.get('/products',(req,res)=>{

    if(!req.query.search){
      return res.send({
           error:"you must provide a search"
       })
    }
     console.log(req.query.search)
    res.send({
        products:[]
    })
})
app.get('/help/*',(req,res)=>{
res.render('error',{
    title:"404",
    name:"Lior Daniel",
    errorMsg:"help article not found"
})
})

app.get('*',(req,res)=>{
    res.render('error',{
        title:"404",
        name:"Lior Daniel",
        errorMsg:"page not found"
    })
})
app.listen(port,()=>{
    console.log('server is up on port '+port)
})