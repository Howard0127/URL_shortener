// require package used in the project
const express = require('express')
const mongoose = require('mongoose')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const generateUrl = require('./generate_url')

const Url = require('./models/url.js')

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

// 規定每一筆請求都需要透過 body-parser 進行前置處理
app.use(bodyParser.urlencoded({ extended: true }))

// routes setting
app.get('/', (req, res) => {
  res.render('index')
})

app.post('/shorteningUrl', (req, res) => {
  const inputUrl = req.body.inputUrl
  const outputUrl = generateUrl()
  return Url.create({ inputUrl, outputUrl })
  .then(() => res.redirect('/'))
  .catch(error => console.log(error))
})

// start and listen on the Express server
app.listen(3000, () => {
  console.log('App is running on port http://localhost:3000.')
})