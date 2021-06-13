const mongoose = require('mongoose')
const {Schema} = mongoose

const UserSchema = new Schema({
  firstname: {
    type: String
  },

  lastname: {
    type: String
  },

  email: {
    type:String,
    required: true,
    unique: true
  },

  contact: {
    type:String,
  },

  password: {
    type: String,
    required: true
  }
},
{
  timestamps: true
})

const User = mongoose.model('User', UserSchema)

module.exports = {User}

