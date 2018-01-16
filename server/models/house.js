const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/houseadvertising')
const Schema = mongoose.Schema;

let houseSchema = new Schema({
  title   : String,
  description  : String,
  category : String,
  img : String,
  price : Number,
  status : String,
  available : {
    type: Boolean,
    default: true
  },
  address: String,
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  }
})

let House = mongoose.model('house', houseSchema)

module.exports = House
