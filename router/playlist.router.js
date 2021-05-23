const express = require('express')
const {extend} = require('lodash')
// const {User} = require('../models/user.model.js')
const {Playlist} = require('../models/playlist.model.js')

const router = express.Router()

router.param('userId', async (req, res, next, userId)=>{
  try{
    let playlist = await Playlist.findOne({__userId: userId})

    if(!playlist){
      playlist = new Playlist({__userId: userId, _playlists: []})
      playlist = await playlist.save()
    }

    req.playlist = playlist
    next()

  }catch(err){
    res.status(400).json({success:false, message: `Failed to access playlist for the requested user`})
  }
})

router.route('/:userId')
.get(async (req, res)=>{
  let {playlist} = req
  res.status(200).json({success:true, data: playlist})
})
.post(async (req, res)=>{
  try{
    let { playlistId, playlistname, videoId, action} = req.body
    let {playlist} = req

    let statusCode;


    switch(action){
      case "CREATE_PLAYLIST":
        statusCode = 201
        // let {playlistname} = req.body
        playlist._playlists.push({__playlistname: playlistname, videoList:[]})
        break;
    
      case "ADD_VIDEO":
        // console.log({videoId})
        // const {videoId} = req.body
        for(let selectedPlaylist of playlist._playlists){
          if(selectedPlaylist._id == playlistId){

            let videoInPlaylist = selectedPlaylist.videoList.some(({__video})=> __video == videoId)

            if(!videoInPlaylist){
              statusCode = 201
              selectedPlaylist.videoList.push({__video: videoId})
            }else{
              statusCode = 200
            }
          }
        }
        break;

      case "CREATE_PLAYLIST_ADD_VIDEO":
        statusCode = 201
        playlist._playlists.push({__playlistname: playlistname, 
        videoList:[{__video: videoId}]})
        break;
        

      case "REMOVE_VIDEO":
        statusCode = 200
        // let {videoId} = req.body
        for(selectedPlaylist of playlist._playlists){
          if(selectedPlaylist._id == playlistId){
            selectedPlaylist.videoList = selectedPlaylist.videoList.filter(({__video})=> __video != videoId)
          }
        }
        break;

      }

    playlist = await playlist.save()
    res.status(statusCode).json({success:true, data: playlist})

  }catch(err){
    res.status(500).json({success:false, message : 'Failed to add video to playlist! Check error message for details', errorMessage: err.message})
  }
})
.delete(async (req, res)=>{
  try{
    let {playlist} = req
    let {playlistId} = req.body


    playlist._playlists = playlist._playlists.filter(selectedPlaylist=> selectedPlaylist._id != playlistId)
    
    playlist = await playlist.save()

    res.status(200).json({success:true, data: playlist})

  }catch(err){
    res.status(500).json({success:false, message: 'Failed to delete playlist! Check error message for details', errorMessage: err.message})
  }
})

module.exports = router