import React,{useState,useEffect} from "react";
import { useNavigate} from "react-router-dom"


const renderDatas = ( {name,price,id,variation,isPositive},ind)=>{
    const signal = isPositive === true ?  "+" :"-"
    const classVariation = isPositive === true ? "positive":"negative"
    
    return(
     <li key={id}>
        <span className="name">{name.toLocaleUpperCase()}</span>
        <span className={"price"+"-"+classVariation}>R$ {price} ({signal}{variation}%)</span>
    </li>
    )
  }
const AssetItem = ({ data })=> {
    const Render = () => {
      if (!data || data.length === 0) return <p>No dates found</p>;
      
      return data.map(renderDatas);
    };
  
    return (
      <ul>
        <Render />
      </ul>
    );
  }

export default function AssetsList({service}){
    const [datas,setDatas] = useState([])
    const navigate = useNavigate("")
  const notAuthorized = (status)=>{
    if(status !== 200)return navigate("/login")
    
  }
    useEffect(() => {
      try{
        
        service.then(({datas,status})=>{
          setDatas(datas)
          notAuthorized(status)
        })
       
      }catch(err){
        
      }
    }, []);
    return <AssetItem data={datas}/>
       
    
  }