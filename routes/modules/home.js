const express = require('express')
const router = express.Router()

const Url = require('../../models/url')
const generateUrl = require('../../generate_url')

// routes setting
// 首頁
router.get('/', (req, res) => {
  res.render('index')
})

// 找出或產生短網址
router.post('/', (req, res) => {
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

// 使用者直接在瀏覽器上貼上短網址後開啟該網頁
router.get('/:tailCode', (req, res) => {
  const tailCode = req.params.tailCode
  return Url.findOne({ outputUrl: {$regex: tailCode}})
    .lean()
    .then((url) => {
      if (!url) {
        const wrongUrl = { tailCode } 
        res.render('output', {wrongUrl} )
      } else {
        res.redirect(url.inputUrl)
      }  
    })
    .catch(error => console.log(error))
})

module.exports = router