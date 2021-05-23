const mongoose = require('mongoose')
const {Schema} = mongoose

const {User} = require('./user.model.js')
const {Video} = require('./video.model.js')


const UserVideoListSchema = new Schema({
  __video: {
    type: Schema.Types.ObjectId,
    ref: 'Video'
  }
})

const LikedVideoSchema = new Schema({
  __userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },

  videoList: {
    type: [UserVideoListSchema],
    default: undefined
  }
},
{
  timestamps: true
})


const LikedVideo = mongoose.model('LikedVideo', LikedVideoSchema)

module.exports = {LikedVideo}
