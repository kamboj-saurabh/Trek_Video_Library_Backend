const mongoose = require('mongoose')
const {Schema} = mongoose

const {Category} = require('./category.model.js')


const VideoSchema = new Schema({
  name: {
    type: String, 
    required:true,
  },
  
  thumbnailUrl: {
    type: String,
    required:true
  },

  embedUrl: {
    type: String,
    required: true
  },

  description: {
    type: String,
    required: true
  },

  duration: {
    type: String, 
    required: true
  },

  date: {
    type: String, 
    required: true
  },

  rating: {
    type:Number, 
    required:true
  },

  authorName: {
    type:String,
    required:true
  },

  authorImgUrl: {
    type:String,
    required:true
  },

  _category: {
    type: Schema.Types.ObjectId,
    ref: 'Category',
    required: true
  }

},
{
  timestamps: true
})

const Video = mongoose.model('Video', VideoSchema)

module.exports = {Video}