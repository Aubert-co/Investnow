const request = require('supertest')
const app = require('../index')
const {User_Assets,Users_profile} = require('../model/index')
const {Op} = require('sequelize')
const jwt = require('jsonwebtoken')
require('dotenv').config()
const secret = process.env.JWTSCRET
const user = {name:'matheu',id:11,password:'123455678',balance:800,
age:25,font:2,risc:1,education:1,loss:2,profile:1}
const assets = [{name:'bitcoin',price:19990,quantity:0,userId:user.id},{name:'xrp',price:"1",quantity:1,userId:user.id}]
var server,token;

describe('',()=>{
    beforeAll(async()=>{
        try{
            server = app.listen(8087)
            await Users_profile.create({...user})
            await User_Assets.bulkCreate(assets)

            token = jwt.sign({id:user.id,profile:user.profile},secret)
        }catch(err){
            console.error('error beforeAll',err)
        }
    })
    it("GET:/user/assets should return assets with a quantity greater than 0.",async()=>{
        const response = await request(server)
            .get(`/user/assets`)
            .set({'Content-Type':'application/json'})
            .set('Authorization',`Bearer ${token}`)

            const {datas} = response.body
            expect(response.statusCode).toBe(200)
            expect(response.body).toHaveProperty('datas')

            expect(datas).toHaveLength(1)
            const findQuantityGreatrThan0 = assets.filter((val)=>val.quantity >0)

            expect(findQuantityGreatrThan0.name).toBe(datas.name)
            expect(findQuantityGreatrThan0.quantity).toBe(datas.quantity)
            expect(findQuantityGreatrThan0.price).toBe(datas.price)
    })

    it("GET:/user/recommend should return recommendations based on the user's profile.",async()=>{
        const response = await request(server)
            .get('/assets/recommend')
            .set({'Content-Type':'application/json'})
            .set('Authorization',`Bearer ${token}`)

            expect(response.statusCode).toBe(200)
            expect(response.body).toHaveProperty('datas')

            const {datas} = response.body

            expect(datas).toHaveLength(5)
            datas.map((val)=>{
                expect(val.profile).toBe(user.profile)
            })
    })
    afterAll(async()=>{
        try{
            await User_Assets.destroy({ where: { userId: { [Op.gt]: 1 } } });
            await Users_profile.destroy({ where: { id: { [Op.gt]: 1 } } });
        }catch(err){
            throw err
        }
    })
})