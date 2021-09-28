// require package used in the project
const express = require('express')
const mongoose = require('mongoose')
const exphbs = require('express-handlebars')

const app = express()

mongoose.connect('mongodb://localhost/URL-shortener')

const db = mongoose.connection

db.on('error', () => {
  console.log('mongodb error!')
})

db.once('open', () => {
  console.log('mongodb connected!')
})

// setting template engine
app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs'}))
app.set('view engine', 'hbs')

// route setting
app.get('/', (req, res) => {
  res.render('index')
})

// start and listen on the Express server
app.listen(3000, () => {
  console.log('App is running on port http://localhost:3000.')
})