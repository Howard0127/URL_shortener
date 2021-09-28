const express = require('express')
const app = express()

app.get('/', (req, res) => {
  res.send('This an URL shortener app.')
})

app.listen(3000, () => {
  console.log('App is running on port http://localhost:3000.')
})