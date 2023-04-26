const route = require('express').Router()
const bcrypt = require('bcrypt')
const {Users_profile} = require('../model')
const jwt = require('jsonwebtoken')
require('dotenv').config()
const secret = process.env.JWTSCRET

route.post('/user/register',async(req,res)=>{
    const {name,password,balance} = req.body
    
    if (typeof name !== 'string' || name.length < 4 ) return res.status(400).json({ message: 'Invalid field: name. It should be a string with at least 4 characters' });
    
    if (typeof password !== 'string' || password.length < 8 ) return res.status(400).json({ message: 'Invalid field: password. It should be a string with at least 8 characters' });
    
    try{ 
        const findUserInDB = await Users_profile.findOne({where:{name}})
       
        if(findUserInDB)return res.status(400).send({message:'User already exists'})

        const HashePassword =await bcrypt.hash(password,10)
        
        const createUser =await  Users_profile.create({
            name,password:HashePassword,balance
        })
        res.status(200).send({message:'sucess'})
    
     
    }catch(err){
        res.status(500).send({ message: 'Internal Server Error: ' + err.message });
    }

})

.post('/user/login',async(req,res)=>{
    const { name,password }  = req.body
    
    if( !name || ! password )return res.status( 400 ).send({message:'missing fields'})
   try{

        const findUsers = await Users_profile.findOne({where:{name}})
        if(findUsers === null)return res.status(400).send({message:'user not found'})

        let {password:passwordFromDB,id,profile}  = findUsers
        const compare = await bcrypt.compare(password,passwordFromDB)
        
        if(!compare)return res.status(400).send({message:'user not found'})
        if(!profile)profile = 2
        const token = jwt.sign({id,profile},secret)
        res.status( 200 ).send({message:'successfully',token})
    }catch( err ){
        console.log(err)
        res.status(500).send({ message: 'Internal Server Error: ' + err.message });
    }
})

module.exports = route