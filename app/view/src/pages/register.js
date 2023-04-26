import React,{useRef, useState} from "react"
import { services } from "../service"
import Form from "../components/form"
import { useNavigate} from "react-router-dom"

const {ServiceRegister}=services


function Register(){
    const navigate = useNavigate();
    
    const [errorMessage,setErrorMessage] = useState("")
    
    const onSubmit = async(inputName,inputPassword,confirmPassword)=>{
        let name = inputName.current.value
        let password = inputPassword.current.value
        let confPassword = confirmPassword.current.value
        if (!name) return setErrorMessage("Please enter your name");
        if (!password || password.length < 8) return setErrorMessage("Password must be at least 8 characters long");
        if(!confPassword)return setErrorMessage("Password and confirm password must match.")
        const {message,status} = await ServiceRegister(name,password)
        
        if(status === 200){
            setErrorMessage("User created successfully! You will now be redirected to the login page.")
            setTimeout(()=>{navigate('/login');},5000)
            return 
        }
        setErrorMessage(message)
    }
    if(errorMessage)setTimeout(()=>setErrorMessage(""),5000)
    
 
    return <Form typeOfForm={"register"} onSubmit={onSubmit} errorMessage={errorMessage}/>
}


export default Register