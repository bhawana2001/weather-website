const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

// Define paths for express config
const publicPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)


//Setup static dir to serve
app.use(express.static(publicPath))                       //to customize server

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: "Bhawana Gaur  "
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Bhawana Gaur  '
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help Page',
        name: 'Bhawana Gaur  ',
        message: 'Welcome to the help page....How can we help you?'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address!'
        })
    }

    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({ error })
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })

    // res.send({
    //     location:'Narnaul,Haryana,India',
    //     forecast:'Currently there is 31 degree and Partly sunny',
    //     address:req.query.address

    // })
})
app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }
    console.log(req.query.search);
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Bhawana Gaur',
        errorMessage: 'Article not found'
    })
})

app.get('*', (req, res) => {        //all routes and use to handle inappropriate routes
    res.render('404', {
        title: '404',
        name: 'Bhawana Gaur',
        errorMessage: 'Page not found'
    })
})

app.listen(3000, () => {
    console.log('Server is running on port 3000.');
})

//send html data into the response 
// app.get('',(req,res)=>{
//     res.send('<h1>Weather</h1>')        
// })

//send json type data by declaring like this
// app.get('/help',(req,res)=>{
//     res.send([
//         {
//             name:'Bhawana Gaur',
//             age:20
//         },{
//             name:'Himanshu Gaur',
//             age:22
//         }
//     ])                         

// })

// //send html data into the response 
// app.get('/about',(req,res)=>{
//     res.send('<h1>Welcome to the About Page</h1>')
// })

//send json type data by declaring like this
