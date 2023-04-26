const {User_Assets} = require('../model/index')
const route = require('express').Router()


route
.use((req,res,next)=>{
    const {name,price,quantity} = req.body
    if (!name || !price || !quantity) return res.status(400).send({ message: 'name, price, quantity, and userId must be provided and valid' });
    
    if (isNaN(price) || isNaN(quantity)) return res.status(400).send({ message: 'price and quantity must be valid numbers' });
    
    next()
    
})
.post('/trade/buy',async(req,res)=>{
    const { name, price, quantity } = req.body;
    const {id:userId} = req.user
    
    try {
      const item = await User_Assets.findOne({ where: { userId, name } });
    
      if (item && price === item.price) {
        const newQuantity = item.quantity =+ quantity
        await User_Assets.update({ quantity: newQuantity }, { where: { userId,name } });
        return res.status(201).send({message:'sucess'}) 
      }
      await User_Assets.create({ userId, name, price, quantity });
      res.status(201).send({ message: 'success' });
    } catch (err) {
      console.log(err);
      res.status(500).send({ message: 'Internal Server Error: ' + err.message });
    }
    
})
.put('/trade/sell',async(req,res)=>{
    const {name,price,quantity} =req.body
    const {id:userId} =req.user
    try{
          const item = await User_Assets.findOne({where:{userId,name}})
          if(item && item.quantity >= quantity){
            const newQuantity = item.quantity -= quantity
            await User_Assets.update({ quantity:newQuantity },{ where:{userId,name }})
            return res.status(201).send({message:'sucess'})
          }
          res.status(400).send({message:'quantity assets not found'})
        
    }catch(err){
        res.status(500).send({ message: 'Internal Server Error: ' + err.message });
    }
})
module.exports = route

