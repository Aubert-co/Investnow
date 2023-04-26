const {checkValues} = require('../controller/helpers')


describe("function checkValues",()=>{
    it("Should return false when a value greater than 3 is sent.",()=>{
        const risc = 4
        const messageError = "Invalid risc"
        const checkRisc = checkValues(risc,messageError)

        expect(checkRisc.sucess).toBeFalsy()
        expect(checkRisc.messageError).toBe(messageError)
    })
 
    it("Should return true when a valid value is sent.",()=>{
        const risc = 2
        const messageError = undefined
        const checkRisc = checkValues(risc,messageError)

        expect(checkRisc.sucess).toBeTruthy()
        expect(checkRisc.messageError).toBeUndefined()
    })
    it("Should return false when a negative value is sent.",()=>{
        const risc = -1
        const messageError = undefined
        const checkRisc = checkValues(risc,messageError)

        expect(checkRisc.sucess).toBeFalsy()
        expect(checkRisc.messageError).toBeUndefined()
    })
})