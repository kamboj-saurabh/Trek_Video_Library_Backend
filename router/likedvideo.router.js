require('dotenv').config()
const express = require('express')
const {LikedVideo} = require('../models/likedVideo.model.js')
const {authenticateToken} = require('../utils/authenticateToken.js')

const router = express.Router()

router.use('/users', authenticateToken)

router.use('/users', async (req, res, next)=>{
  try{
    let {userId} = req 
    let likedVideos = await LikedVideo.findOne({__userId: userId})

    if(!likedVideos){
      likedVideos = new LikedVideo({__userId: userId, videoList:[]})
      likedVideos = await likedVideos.save()
    }

    req.likedVideos = likedVideos
    next()

  }catch(err){
    res.status(400).json({success:false, message: 'Failed to access videos for requested user'})
  }
})


router.route('/users')
.get(async (req, res)=>{
  const {likedVideos} = req
  res.status(200).json({success:true, data: likedVideos })
})
.post(async(req, res)=>{
  try{

    let {likedVideos} = req
    let {videoId} = req.body
    let statusCode;

    
    let videoInLikedVideos = likedVideos.videoList.some(({__video})=> __video == videoId)

    if(videoInLikedVideos){
      statusCode = 200
    }else{
      statusCode = 201
      likedVideos.videoList.push({__video: videoId})
    }

    likedVideos = await likedVideos.save()
    res.status(statusCode).json({success:true, data: likedVideos})

  }catch(err){
    res.status(500).json({success:false, message:'Failed to add video! check error message for details ', errorMessage: err.message})
  }
})
.delete(async (req, res)=>{
  try{
    let {likedVideos} = req
    let {videoId} = req.body


    likedVideos.videoList = likedVideos.videoList.filter(({__video})=> __video != videoId)

    likedVideos = await likedVideos.save()
    res.status(200).json({success:true, data: likedVideos})
    
  }catch(err){
    res.status(500).json({success:false, message: 'Failed to delete video!check error message for details ', errorMessage: err.message})
  }
})


module.exports = router