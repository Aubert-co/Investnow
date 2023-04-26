const url = "http://localhost:8081/" 
export const services ={
    ServiceAssets:async()=>{
        const response = await fetch(`${url}assets`)
        const {datas} = await response.json()
        return {datas,status:response.status}
    },
    ServiceAssetsVariation:async(variation,direction)=>{
        const response = await fetch(`${url}assets/${variation}/${direction}`)
        const {datas} = await response.json()
        return {datas,status:response.status}
    },
    ServiceLogin:async(name,password)=>{
        const response =await fetch(`${url}user/login`,{
            method:"POST",
            body:JSON.stringify({name,password}),
            headers:{'Content-Type':'application/json', Authorization:`Bearer ${token}`}
        })
        const {token,message} = await response.json()
        return {status:response.status,token,message}
    },
    ServiceRegister:async(name,password,balance)=>{
        const response = await fetch(`${url}user/register`,{
            method:"POST",
            body:JSON.stringify({name,password,balance}),
            headers:{'Content-Type':'application/json', Authorization:`Bearer ${token}`}
        })
        const {message} = await response.json()
        return {status:response.status,message}
    },
    ServiceProfile:async({age,education,loss,risc,font})=>{
        const token = localStorage.getItem("token");
        const response = await fetch(`${url}profile`,{
            method:"PUT",
            body:JSON.stringify({age,education,loss,risc,font}),
            headers:{'Content-Type':'application/json', Authorization:`Bearer ${token}`},
           
        })
        return {status:response.status}
    },
    ServiceUserAssets:async()=>{
        const token = localStorage.getItem("token");
        const response = await fetch(`${url}user/assets`,{
            method:"GET",
            headers:{'Content-Type':'application/json', Authorization:`Bearer ${token}`},
           
        })
        const {datas,message} = await response.json()
        return {status:response.status,datas}
    },
    ServiceAssetsRecommended:async()=>{
        const token = localStorage.getItem("token");
        const response = await fetch(`${url}assets/recommend`,{
            method:"GET",
            headers:{'Content-Type':'application/json', Authorization:`Bearer ${token}`},
           
        })
        const {datas} =await response.json()
        return {datas,status:response.status}
    },
    BuyAssets:async({name,price,quantity})=>{
        const token = localStorage.getItem("token");
        const response = await fetch(`${url}trade/buy`,{
            method:"POST",
            headers:{'Content-Type':'application/json', Authorization:`Bearer ${token}`},
            body:JSON.stringify({name,price,quantity})
        })
        return {status:response.status}
    },
    SellAssets:async(name,quantity)=>{
        const token = localStorage.getItem("token");
        const response = await fetch(`${url}trade/buy`,{
            method:"PUT",
            headers:{'Content-Type':'application/json', Authorization:`Bearer ${token}`},
            body:JSON.stringify({name,quantity})
        })
        return {status:response.status}
    }

}