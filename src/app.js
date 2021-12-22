const path = require('path')
const express = require('express')
const hbs = require('hbs')

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')


const app = express()

// paths for express config
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')
const publicDirectory =  path.join(__dirname, '../public')

// setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// setting public directory
app.use(express.static(publicDirectory))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather app',
        name: 'Abhishek'
    })
})

app.get('/about', (req, res) => {
    res.render('about',{
        title: 'About',
        name: 'Abhishek'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        message: "Help me!",
        name: 'Abhishek'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        res.send({
            error: "No address sent."
        })
    } else {
        geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
            if (error) {
                console.log('Error', error)
                res.send({
                    error
                })
            }
            forecast(latitude, longitude, (error, {forecast} = {}) => {
                if (error) {
                    console.log('Error', error)
                    return
                }
                res.send({
                    forecast,
                    location,
                    address: req.query.address
                })
            })
        })
        
    }

})

app.get('/products', (req, res) => {
    console.log(req.query.search)
    res.send(req.query.search)
})

app.get('*', (req, res) => {
    res.send("My 404 page")
})



app.listen(3000, () => {
    console.log('Server is up on port 3000')
})