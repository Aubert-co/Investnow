import React from "react"
import {Route , BrowserRouter,Routes} from "react-router-dom"
import Home from "./index"
import Trader from "./trader"
import FinancialAssets from "./FinancialAssets"
import Login from "./Login"
import Register from "./register"
export const Router = ()=>{

    return (
        <BrowserRouter>
            <Routes>
                <Route  path="/" element={<Home/>}/>
                <Route path="/trader/:assets" element={<Trader/>}/>           
                <Route path="/assets" element={<FinancialAssets/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/register" element={<Register/>}/>
            </Routes>
        </BrowserRouter>
    )
}
