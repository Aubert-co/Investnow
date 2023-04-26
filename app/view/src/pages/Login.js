import React,{useRef, useState} from "react"
import { services } from "../service"
import Form from "../components/form"
import { useNavigate} from "react-router-dom"

const {ServiceLogin}=services


function Login(){
    const navigate = useNavigate();
    
    const [errorMessage,setErrorMessage] = useState("")
    
    const onSubmit = async(inputName,inputPassword)=>{
        let name = inputName.current.value
        let password = inputPassword.current.value
        if (!name) return setErrorMessage("Please enter your name");
        if (!password || password.length < 8) return setErrorMessage("Password must be at least 8 characters long");
      
        const {token,message,status} = await ServiceLogin(name,password)
        
        if(status === 200){
            setErrorMessage("Login successfully! You will now be redirected to the home page.")
            localStorage.setItem("token",token)
            navigate('/');
            setTimeout(()=>{navigate("/")},5000)
            return 
        }
        setErrorMessage("User not found")
    }
    if(errorMessage)setTimeout(()=>setErrorMessage(""),5000)
    
 
    return <Form typeOfForm={"login"} onSubmit={onSubmit} errorMessage={errorMessage}/>
}


export default Login