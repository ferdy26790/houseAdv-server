const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/houseadvertising');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name   : String,
  password  : String,
  email : String,
  address : String,
  phone : Number,
  posts:[{
    type: Schema.Types.ObjectId,
    ref: 'house'
  }]
})

let User = mongoose.model('user', userSchema)

module.exports = User
