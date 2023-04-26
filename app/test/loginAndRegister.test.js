const request = require('supertest')
const bcrypt = require('bcrypt')
const {Users_profile} = require('../model')
const {Op} = require('sequelize')
const server = require('../index')
var app
const datasToInsert = {name:'matheus',password:'123456789',balance:8,
age:25,font:2,risc:1,education:1,loss:2}



describe("API POST /user/register",()=>{
    beforeAll(async()=>{
       app = server.listen(8081)
    })
        it("Should return status code 400 when the age is less than 18.",async()=>{
            const newDatas ={...datasToInsert,age:17}
            const response = await request(app)
            .post('/user/register')
            .set({'Content-Type':'application/json'})
            .send({...newDatas})

            expect( response.statusCode ).toBe( 400 )
            expect( response.body.message ).toBe("Invalid age value")
        })  
        it("Should return status code 400 when the age is not a number.",async()=>{
            const newDatas ={...datasToInsert,age:'19e'}
            const response = await request(app)
            .post('/user/register')
            .set({'Content-Type':'application/json'})
            .send({...newDatas})

            expect( response.statusCode ).toBe( 400 )
            expect( response.body.message ).toBe("Invalid age value")
        })  
        it("Should return status code 400 when the age is greater than 89.",async()=>{
            const newDatas ={...datasToInsert,age:95}
            const response = await request(app)
            .post('/user/register')
            .set({'Content-Type':'application/json'})
            .send({...newDatas})

            expect( response.statusCode ).toBe( 400 )
            expect( response.body.message ).toBe("Invalid age value")
        })  
        
       it("Should create a user and return a status of 201 when all data is sent correctly.",async()=>{
            const response = await request(app)
                .post("/user/register")
                .set({'Content-Type':'application/json'})
                .send({...datasToInsert})

                expect(response.statusCode).toBe(201)
                expect(response.body.message).toBe("sucess")

                const findValues = await Users_profile.findOne({where:{name:'matheus'}})

                expect(findValues.name).toBe(datasToInsert.name)
                expect(findValues.password).not.toEqual(datasToInsert.password)
                expect(findValues.balance).toBe(datasToInsert.balance)
          
            expect(bcrypt.compare(findValues.password,datasToInsert.password)).toBeTruthy()
        })
        it("Should not create a user when the password is shorter than 8 characters.",async()=>{
            const response = await request(app)
                .post("/user/register")
                .set({'Content-Type':'application/json'})
                .send({...datasToInsert,password:"123"})

                expect(response.statusCode).toBe(400)
                expect(response.body.message).toBe("Invalid field: password. It should be a string with at least 8 characters")
                
                const findValues = await Users_profile.findOne({where:{name:'matheus'}})
                expect(findValues).toBeNull()
        })
        it("Should not create a user when the name is not sent correctly.",async()=>{
            const response = await request(app)
                .post("/user/register")
                .set({'Content-Type':'application/json'})
                .send({...datasToInsert,name:""})

                const findValues = await Users_profile.findOne({where:{name:'matheus'}})

                expect(response.statusCode).toBe(400)
                expect(response.body.message).toBe("Invalid field: name. It should be a string with at least 4 characters")
                
                expect(findValues).toBeNull()
        })
        it("Should not create a user when a non-numeric balance is sent.",async()=>{
            const response = await request(app)
                .post("/user/register")
                .set({'Content-Type':'application/json'})
                .send({...datasToInsert,balance:"1e"})

                expect(response.statusCode).toBe(400)
                expect(response.body.message).toBe("balance needs to be a number")

                const findValues = await Users_profile.findOne({where:{name:'matheus'}})
                expect(findValues).toBeNull()
        })
    afterEach(async()=>{
        await Users_profile.destroy({ where: { id: { [Op.gt]: 1 } } });
    })
})

describe("API POST/user/login",()=>{
    beforeAll(async()=>{
        try{
            const password = await bcrypt.hash(datasToInsert.password,10)
            await Users_profile.create({...datasToInsert,password})
        }catch(err){
            console.error('error beforeAll /user/login',err)
        }
    })
    it("When a correct name and password are sent, the user should be able to log in successfully.",async()=>{
        const response = await request(app)
            .post('/user/login')
            .set({'Content-Type':'application/json'})
            .send({name:datasToInsert.name,password:datasToInsert.password})

            expect(response.body.message).toBe('successfully')
            expect(response.statusCode).toBe(200)
    })
    it("When an undefined name is sent, it should return a status of 400.",async()=>{
        const response = await request(app)
            .post('/user/login')
            .set({'Content-Type':'application/json'})
            .send({name:"",password:datasToInsert.password})

            expect(response.statusCode).toBe(400)
          
    
    })
    it("Should return a status of 400 when an undefined password is sent.",async()=>{
        const response = await request(app)
            .post('/user/login')
            .set({'Content-Type':'application/json'})
            .send({name:datasToInsert.name,password:""})

            expect(response.statusCode).toBe(400)
      
    })
    it("Should return a status of 401 when a wrong password is sent.",async()=>{
        const response = await request(app)
            .post('/user/login')
            .set({'Content-Type':'application/json'})
            .send({name:datasToInsert.name,password:"12345"})

            expect(response.statusCode).toBe(400)
    })
    afterEach(async()=>{
        await Users_profile.destroy({ where: { id: { [Op.gt]: 1 } } });
    })
   
})