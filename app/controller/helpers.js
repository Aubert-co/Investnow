const checkValues = (value,messageError)=>{
    if(isNaN(value) || (value <0|| value >3 ))return {sucess:false,messageError}
    return {sucess:true}
}

module.exports = {checkValues}