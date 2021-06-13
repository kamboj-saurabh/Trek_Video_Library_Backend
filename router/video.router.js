const express = require('express')
const {extend} = require('lodash')
const {Video} = require('../models/video.model.js')

const router = express.Router()

router.route('/')
.get(async (req, res)=>{
  try{
    const videos = await Video.find({})
    res.status(200).json({success:true, data: videos})
  }catch(err){
    res.status(500).json({success:false, message:'Failed to retrieve data, check error message for details', errorMessage: err.message})
  }
})
.post(async(req, res)=>{
  try{
    const newVideoObj = req.body
    const videoObj = new Video(newVideoObj)
    const savedObj = await videoObj.save()
    res.status(201).json({success:true, data: savedObj})

  }catch(err){
    res.status(500).json({success:false, message: 'Failed to save data, check error message for details', errorMessage: err.message})
  }
})




router.param('videoId', async (req, res, next, videoId)=>{
  try{
    const video = await Video.findById(videoId)
    
    if(!video){
      return res.status(400).json({success:false, message:`No video with id ${videoId} exists`})
    }

    req.video = video

    next()
  }catch(err){
    res.status(400).json({success:false, message:`No video with id ${videoId} exists`})
  }
})

router.route('/:videoId')
.get(async (req, res)=>{
  let {video} = req
  res.status(200).json({success:true, data: video})
})
.post(async( req, res)=>{
  const updateObj = req.body
  let {video} = req

  video = extend(video, updateObj)
  video = await video.save()
  res.status(201).json({success:true, data: video})
})
.delete(async (req, res)=>{
  let {video} = req
  video = await video.remove()
  video.deleted = true
  res.status(200).json({success:true, deleted_data: video})
})


module.exports = router