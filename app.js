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
// 首頁
app.get('/', (req, res) => {
  res.render('index')
})

// 找出或產生短網址
app.post('/shorteningUrl', (req, res) => {
  const inputUrl = req.body.inputUrl
  return Url.findOne({ inputUrl })
    .lean()
    .then((url) => {
      // 從inputUrl判斷資料庫有沒有該筆資料
      // 沒有的話產生一個新的短網址newOutputUrl，和inputUrl存入資料庫後渲染
      // 有的話，該筆資料渲染在畫面上
      if(!url) {
        const newOutputUrl = generateUrl()
        Url.create({ inputUrl, outputUrl: newOutputUrl })
          .then(() => res.render('output', { inputUrl, newOutputUrl }))
      } else {
        res.render('output', { url })
      }
    })
    .catch(error => console.log(error))
})

// 直接在瀏覽器上貼上短網址後開啟該網頁
app.get('/tinyURL/:tailCode', (req, res) => {
  const tailCode = req.params.tailCode
  // console.log(tailCode)
  return Url.findOne({ outputUrl: {$regex: tailCode}})
    .lean()
    .then((url => res.redirect(url.inputUrl)))
})


// start and listen on the Express server
app.listen(3000, () => {
  console.log('App is running on port http://localhost:3000.')
})