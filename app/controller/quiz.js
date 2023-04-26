const route = require('express').Router()
const fs = require('fs')
const {checkValues} = require('./helpers')
const DT = require('decision-tree')
const json = fs.readFileSync('controller/trainedData.json')

const {Users_profile} = require('../model')
const predictML = new DT(JSON.parse(json))

route.put('/profile',async(req,res)=>{
    const {age,education,loss,risc,font} = req.body
    const {id}  =req.user
    const checkEducation = checkValues(education,"Invalid education value")
    const checkLoss = checkValues(loss,"Invalid loss value")
    const checkRisc = checkValues(risc,"Invalid risc value")
    const checkFont = checkValues(font,"Invalid font value")

    if(isNaN(balance))return res.status(400).send({message:"balance needs to be a number"})
    
    if (isNaN(age) ||  ( age<18 || age>89) )return res.status(400).send({message: "Invalid age value"});
      
    if(!checkEducation.sucess)return res.status(400).send({message:checkEducation.messageError})
      
    if(!checkLoss.sucess)return res.status(400).send({message:checkLoss.messageError})
      
    if(!checkRisc.sucess)return res.status(400).send({message:checkRisc.messageError})
      
    if(!checkFont.sucess)return res.status(400).send({message:checkFont.messageError})
      
    const userStats = {
        age:age/100,
        education:education/100,loss:loss/100,
        risc:risc/100,font:font/100
    }
  
    const profile = predictML.predict({...userStats})
    userStats.profile = profile
    try {
        const [numUpdated, updatedRows] = await Users_profile.update(userStats, {
            where: { id },
            returning: true, 
            plain: true 
          });
        
          if (numUpdated === 0)return res.status(400).send({message:'user not found'})

          res.status(201).send({message:"sucess"})
    } catch (err) {
        res.status(500).send({message:"something went wrong"+err.message})
    }
})
module.exports = route