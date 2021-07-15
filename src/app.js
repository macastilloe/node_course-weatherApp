const path = require('path')
const express = require('express')
const { disconnect } = require('process')
const hbs = require('hbs')
const geocode = require('./utils/geocode.js')
const forecast = require('./utils/forecast.js')



const app = express()
const port = process.env.PORT || 3000



//Define paths for Express config 
const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath =  path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)


//Setup static directory to serve
app.use(express.static(publicDirectoryPath))



app.get('', (req, res)=>{
    res.render('index',{
        title: 'Weather',
        name: 'Miguel C.'
    })
})

app.get('/about', (req, res)=>{
    res.render('about',{
        title: 'About me',
        name: 'Miguel C.'
    })
})

app.get('/help', (req, res)=>{
    res.render('help',{
        title: 'Help',
        helpmsg: 'Helpful message',
        name: 'Miguel C.'
    })
})

app.get('/weather', (req, res)=>{
    if(!req.query.address){
        return res.send({
            error: 'You must provide an address term!'
        })
    }
    // console.log(req.query)
    geocode(req.query.address, (error, {longitud, latitud, location} = {}) => {
        if(error){
            return res.send({ error })
        }
        
        forecast( longitud, latitud, (error, forecastData) => {
            if(error){
                return res.send({error})
            }
            res.send({forecast: forecastData, location, address: req.query.address})
        })
    })
    
})


//Set a 404 page for an specific route
app.get('/help/*', )

//Set the 404 page
app.get('*',(req, res)=>{
    res.render('404', {title:'404',
            name: 'Miguel C',
            errorMessage: 'Page not found'})
})

app.listen(port, () => {
    console.log('Server is up on port '+port)
})
