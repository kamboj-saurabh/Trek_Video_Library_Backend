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
    required: true,
    unique: true,
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

