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

const UserPlaylistSchema = new Schema({
  __playlistname:{
    type:String
  },

  videoList: {
    type:[UserVideoListSchema],
    default: undefined
  }
})

const PlaylistSchema = new Schema({
  __userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },

  _playlists: {
    type: [UserPlaylistSchema],
    default: undefined
  } 

},
{
  timestamps: true
})

const Playlist = mongoose.model('Playlist', PlaylistSchema )

module.exports = {Playlist}