const express = require('express')
const Conversation = require('../Models/convoModel')
const router = require('./authRoutes')
const protect = require('../middleware/authMiddleware')

const routes=express.Router()

routes.post('/uploadConvo',protect,async(req,res)=>{
  const {userId,messages,chatId} = req.body
  let exsitingConvo;
  if(chatId){
    exsitingConvo = await Conversation.findOne({_id:chatId})
  }
 
  if(!exsitingConvo){
    const convo = new Conversation({
      userId:userId,
      title:messages[0].message,
      messages:messages
    })

    await convo.save()

    return res.send({message:'New Convo Created', convo:convo})
  }

  exsitingConvo.messages.push(...messages)
  const saved = await exsitingConvo.save()
  res.send({message:'convo saved',convo:saved})
})

routes.get('/getConvo/:userId/:chatId',protect,async(req,res)=>{
  const {chatId,userId} = req.params
  const existingConvo=await Conversation.find({userId:userId,_id:chatId}).select('messages')
  if(!existingConvo){
    return res.send({message:"Conversation not found, may be moved or deleted."})
  }
 // console.log(existingConvo)
  res.send({
  message: "Here is your convo",
  messages: existingConvo[0].messages
})
})

routes.get('/allConvos/:userId',protect,async(req,res)=>{
  const userId = req.params.userId
  const convos = await Conversation.find({userId:userId}).select('_id title')
  res.send(convos)
})

module.exports = routes