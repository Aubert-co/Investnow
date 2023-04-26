import React,{useRef} from "react"
import { useNavigate} from "react-router-dom"
import { FormStyle } from "../styles/formStyle"


function Form({typeOfForm,errorMessage,onSubmit}){
    const inputName= useRef("")
    const inputPassword = useRef("")
    const inputConfirmPassword = useRef("")
    const navigate = useNavigate()

    const onChangeForm = (url)=>navigate(url)
    const IsRegister =()=>{
        if(typeOfForm === "login"){return(
                <>
                    <button type="submit" onClick={()=>onSubmit(inputName,inputPassword)}>Login</button>
                    <div className="signup">
                        <p>Don't have an account?<a href="#" onClick={()=>onChangeForm("/register")}>Registre-se</a></p>
                    </div>
                </>
            )
        }
        return (
            <>
              <label htmlFor="confirmpassword">Confirm Password</label>
                    <input type="password"  ref={inputConfirmPassword} name="confirmpassword" required/>
                    <button type="submit" onClick={()=>onSubmit(inputName,inputPassword,inputConfirmPassword)}>Register</button>
                    <div className="signup">
                        <p>Already have an account?<a href="#" onClick={()=>onChangeForm("/login")}>Login</a></p>
                    </div>  
            </>
        )
    }

    return (
        <FormStyle>
        
            <div className="message">{errorMessage.toUpperCase()}</div>
                <h1>{typeOfForm.toUpperCase()}</h1>
                <label htmlFor="email">Name</label>
                    <input type="email" ref={inputName} name="email" required/>
                <label htmlFor="password">Password</label>
                    <input type="password"  ref={inputPassword} name="password" required/>
                
                  {<IsRegister/>}
                
      </FormStyle>
    )
}


export default Form