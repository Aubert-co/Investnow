import styled from 'styled-components'

export const HeaderStyle = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  background-color: #302d2d;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  width:95%;
  h1{
    margin:0;
    font-size:28px;
    font-weight:bold;
    color:white
  }
  .divider {
    
    margin-top: 20px;
    margin-bottom: 20px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    padding-right: 20px;
    
  }
  
  .divider a {
    margin-left: 10%;
    color: #dfdede;
    text-decoration: none;
    font-size: 16px;
    font-weight: bold;
    background-color: rgb(92, 85, 85);
    padding: 5%;
    white-space: nowrap;
  }
.divider  :hover{
    background-color: #dfdede;
    color: rgb(92,85,85);
}
    `