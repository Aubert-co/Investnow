const request = require('supertest')
const app = require('../index')
var server; 

describe("API assets",()=>{
    beforeAll(async()=>{
        server = app.listen(8085)
        
    })
  
    it("GET:/assets Should return an array of assets",async()=>{
        
        const response =await request(server)
            .get(`/assets`)

        expect(response.statusCode).toBe(200)
        const {datas} = response.body
        expect(datas).toHaveLength(5)
      
    })
    it("GET:assets/:variation/:direction Should return assets that appreciated in value when send 1",async()=>{
        const variation = "ASC"
        const positiveOrNegative = 1 
        const response =await request(server)
            .get(`/assets/${variation}/${positiveOrNegative}`)

        expect(response.statusCode).toBe(200)
        expect(response.body).toHaveProperty('datas')
        const {datas} = response.body
  
        expect(datas).toHaveLength(5)

       const isPositive = datas.filter((val)=>val.isPositive === true)
       expect(isPositive).toHaveLength(5)
    })
    it("GET:assets/:variation/:direction Should return assets that depreciated in value when 0 is sent.",async()=>{
        const variation = "ASC"
        const positiveOrNegative = 0
        const response =await request(server)
            .get(`/assets/${variation}/${positiveOrNegative}`)

        expect(response.statusCode).toBe(200)
        expect(response.body).toHaveProperty('datas')
        const {datas} = response.body
  
        expect(datas).toHaveLength(5)

       const isPositive = datas.filter((val)=>val.isPositive === false)
       expect(isPositive).toHaveLength(5)
    })
})