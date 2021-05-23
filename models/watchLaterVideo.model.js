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

const WatchLaterSchema = new Schema({
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


const WatchLaterVideo = mongoose.model('WatchLaterVideo', WatchLaterSchema)

module.exports = {WatchLaterVideo}
