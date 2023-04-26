import React from 'react'
import { HeaderStyle } from '../styles/headerStyle'

function Header(){

  return(
  <HeaderStyle>
        <h1>INVESTNOW</h1>
        <div className="divider">
          <a href="#">{"Lucas"}</a>
          <a href="#">Assets</a>
        </div>
    </HeaderStyle>
  )
}

export default Header