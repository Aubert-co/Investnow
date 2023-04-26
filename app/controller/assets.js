const {Assets} = require('../model/index')
const route = require('express').Router()
const { Op } = require('sequelize');


route
.get('/assets',async(req,res)=>{
    try{
        const datas = await Assets.findAll({limit:5})

        res.status(200).send({message:"sucess",datas})
    }catch(err){
        res.status(500).send({ message: 'Internal Server Error: ' + err.message });
    }
})
.get('/assets/:variation/:direction',async(req,res)=>{
    const { variation, direction } = req.params;
    
    const sortingDirection = (variation === 'ASC' || variation === 'DESC') ? variation : 'ASC';
    const isPositive = Number(direction) === 1 || Number(direction) === 0 ? Number(direction) : 0;

    try{
      
        const datas = await Assets.findAll({
            limit:5,
            order: [['variation', sortingDirection]],
            where: { isPositive }
        })
        res.status(200).send({message:"sucess",datas})
    }catch(err){
        res.status(500).send({ message: 'Internal Server Error: ' + err.message });
    }
})

module.exports = route