const request = require('supertest')
const app = require('../index')
const {Users_profile,User_Assets} = require('../model/index')
const {Op} = require('sequelize')
const bcrypt = require('bcrypt')
const HashePassword = bcrypt.hashSync('123456789',10)
const jwt = require('jsonwebtoken')
require('dotenv').config()
const secret = process.env.JWTSCRET
var server, token;

const userDatas = {name:'matheu',id:11,password:HashePassword,balance:800,
age:25,font:2,risc:1,education:1,loss:2,profile:1}
const datasTrade = {name:'bitcoin',price:29999,quantity:2}

describe("API /trade",()=>{
    beforeAll(async()=>{
        server = app.listen(8082)
        await Users_profile.create({...userDatas})
        token = jwt.sign({id:userDatas.id,profile:userDatas.profile},secret)
    })
    it("POST:/trade/buy should return a status code 400 when sending a non-numeric price.",async()=>{
        const newDatasTrade = {...datasTrade,price:'e1'}
        const response = await request(server)
            .post('/trade/buy')
            .set({'Content-Type':'application/json'})
            .set('Authorization',`Bearer ${token}`)
            .send({...newDatasTrade})

        expect(response.statusCode).toBe(400)
        
        const findDatas = await User_Assets.findAll({where:{userId:userDatas.id}})
        const datasFromDB = findDatas[0]
        expect(datasFromDB).toBeUndefined()
    })
    it("POST:/trade/buy should return a status code 400 when sending a non-numeric quantity.",async()=>{
        const newDatasTrade = {...datasTrade,quantity:'e1'}
        const response = await request(server)
            .post('/trade/buy')
            .set({'Content-Type':'application/json'})
            .set('Authorization',`Bearer ${token}`)
            .send({...newDatasTrade})

        expect(response.statusCode).toBe(400)
        
        const findDatas = await User_Assets.findAll({where:{userId:userDatas.id}})
        const datasFromDB = findDatas[0]
        expect(datasFromDB).toBeUndefined()
    })
 it("POST:/trade/buy should buy assets when valid data is sent in the request.",async()=>{
        
        const response = await request(server)
            .post('/trade/buy')
            .set({'Content-Type':'application/json'})
            .set('Authorization',`Bearer ${token}`)
            .send({...datasTrade})
    
        expect(response.statusCode).toBe(201)
        
        const findDatas = await User_Assets.findAll({ where:{userId:userDatas.id}})
        const datasFromDB = findDatas[0].dataValues
        expect(datasFromDB.price).toBe(datasTrade.price)
        expect(datasFromDB.name).toBe(datasTrade.name)
        expect(datasFromDB.quantity).toBe(datasTrade.quantity)
    
    })
   it("POST:/trade/buy should update the quantity of an asset if the same asset is sent again when it already exists.",async()=>{
        datasTrade.quantity = datasTrade.quantity+7

        const response = await request(server)
            .post('/trade/buy')
            .set({'Content-Type':'application/json'})
            .set('Authorization',`Bearer ${token}`)
            .send({...datasTrade})

        expect(response.statusCode).toBe(201)
        
        const findDatas = await User_Assets.findAll({where:{userId:userDatas.id}})
        const datasFromDB = findDatas[0].dataValues
        
        expect(datasFromDB.price).toBe(datasTrade.price)
        expect(datasFromDB.name).toBe(datasTrade.name)
        expect(datasFromDB.quantity).toBe(datasTrade.quantity)
        
    })
   
   
    it("PUT:/trade/sell should return a status 400 Bad Request when sending an invalid price.",async()=>{
       
        const newDatasTrade = {...datasTrade,price:"29e"}
        const response = await request(server)
            .put('/trade/sell')
            .set({'Content-Type':'application/json'})
            .set('Authorization',`Bearer ${token}`)
            .send({...newDatasTrade})

        expect(response.statusCode).toBe(400)

        const findDatas = await User_Assets.findAll({where:{userId:userDatas.id,name:datasTrade.name}})
        const datasFromDB = findDatas[0].dataValues
        expect(datasFromDB.price).toBe(datasTrade.price)
        expect(datasFromDB.name).toBe(datasTrade.name)
        expect(datasFromDB.quantity).toBe(datasTrade.quantity)
    })
    it("PUT:/trade/sell When sending an invalid quantity, the API should return a status 400 Bad Request.",async()=>{
       
        const newDatasTrade = {...datasTrade,quantity:"29e"}
        const response = await request(server)
            .put('/trade/sell')
            .set({'Content-Type':'application/json'})
            .set('Authorization',`Bearer ${token}`)
            .send({...newDatasTrade})

        expect(response.statusCode).toBe(400)
        const findDatas = await User_Assets.findAll({where:{userId:userDatas.id,name:datasTrade.name}})

        const datasFromDB = findDatas[0].dataValues
        expect(datasFromDB.price).toBe(datasTrade.price)
        expect(datasFromDB.name).toBe(datasTrade.name)
        expect(datasFromDB.quantity).toBe(datasTrade.quantity)
        
    })
    it("PUT:/trade/sell should sell assets when valid information is sent in the request.",async()=>{
        const newQuantity = {...datasTrade,quantity:7}
        const response = await request(server)
            .put('/trade/sell')
            .set({'Content-Type':'application/json'})
            .set('Authorization',`Bearer ${token}`)
            .send({...newQuantity})

        
        expect(response.statusCode).toBe(201)
        const findDatas = await User_Assets.findAll({where:{userId:userDatas.id,name:datasTrade.name}})

        const datasFromDB = findDatas[0].dataValues
        expect(datasFromDB.price).toBe(datasTrade.price)
        expect(datasFromDB.name).toBe(datasTrade.name)
        expect(datasFromDB.quantity).toBe(datasTrade.quantity-newQuantity.quantity)
    })
    it("PUT:/trade/sell should return a status 400 Bad Request when sending an asset that does not exist.",async()=>{
        const newQuantity = {...datasTrade,name:"XRP"}
        const response = await request(server)
            .put('/trade/sell')
            .set({'Content-Type':'application/json'})
            .set('Authorization',`Bearer ${token}`)
            .send({...newQuantity})

        expect(response.statusCode).toBe(400)
        
    })
    afterAll(async()=>{
        await User_Assets.destroy({ where: { userId: { [Op.gt]: 1 } } });
        await Users_profile.destroy({ where: { id: { [Op.gt]: 1 } } });
    })
})
