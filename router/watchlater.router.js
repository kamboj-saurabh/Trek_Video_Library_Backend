require('dotenv').config()
const express = require('express')
const {extend} = require('lodash')
const {WatchLaterVideo} = require('../models/watchLaterVideo.model.js')
const {authenticateToken} = require('../utils/authenticateToken.js')

const router = express.Router()

router.use('/users', authenticateToken)

router.use('/users', async (req, res, next)=>{
  try{
    let {userId} = req
    let watchLaterVideos = await WatchLaterVideo.findOne({__userId: userId})

    if(!watchLaterVideos){
      watchLaterVideos = new WatchLaterVideo({__userId: userId, videoList:[]})
      watchLaterVideos = await watchLaterVideos.save()
    }

    req.watchLaterVideos = watchLaterVideos
    next()

  }catch(err){
    res.status(400).json({success:false, message: 'Failed to access videos for requested user'})
  }
})


router.route('/users')
.get(async (req, res)=>{
  const {watchLaterVideos} = req
  res.status(200).json({success:true, data: watchLaterVideos })
})
.post(async(req, res)=>{
  try{

    let {watchLaterVideos} = req
    let {videoId} = req.body
    let statusCode;
    
    let videoInWatchLater = watchLaterVideos.videoList.some(({__video})=> __video == videoId)

    if(videoInWatchLater){
      statusCode = 200
    }else{
      statusCode = 201
      watchLaterVideos.videoList.push({__video: videoId})
    }

    watchLaterVideos = await watchLaterVideos.save()
    res.status(statusCode).json({success:true, data: watchLaterVideos})

  }catch(err){
    res.status(500).json({success:false, message:'Failed to add video! check error message for details ', errorMessage: err.message})
  }
})
.delete(async (req, res)=>{
  try{
    let {watchLaterVideos} = req
    let {videoId} = req.body

    watchLaterVideos.videoList = watchLaterVideos.videoList.filter(({__video})=> __video != videoId)

    watchLaterVideos = await watchLaterVideos.save()
    res.status(200).json({success:true, data: watchLaterVideos})

  }catch(err){
    res.status(500).json({success:false, message: 'Failed to delete video!check error message for details ', errorMessage: err.message})
  }
})

module.exports = router