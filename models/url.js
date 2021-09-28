const mongoose = require('mongoose')
const Schema = mongoose.Schema

const urlSchema = new Schema({
  inputUrl: {
    type: String,
    required: true
  },
  outputUrl: {
    type: String,
    required: true
  }
})

module.exports = mongoose.model('Url', urlSchema)