const {User_Assets,Assets} = require('../model/index')
const route = require('express').Router()
const {Op} = require('sequelize')


route
.get('/user/assets',async(req,res)=>{
    const {id:userid} = req.user
   
    try{
        const datas = await User_Assets.findAll({where: {userid,quantity: {[Op.gt]: 0}}});
        res.status(200).send({message:"sucess",datas})
    }catch(err){
        res.status(500).send({ message: 'Internal Server Error: ' + err.message });
    }
})
.get('/assets/recommend',async(req,res)=>{
    const {profile} = req.user
     try{
            const datas = await  Assets.findAll({limit:5,where:{profile}}) 
           
            res.status(200).send({message:'sucess',datas})
     }catch(err){
         res.status(500).send({ message: 'Internal Server Error: ' + err.message });
     }
 })
module.exports = route