import styled from "styled-components";


export const MainStyle = styled.main`
display:flex;
flex-wrap:wrap;
margin-top:2%;
.balance ,
.assets,
.recommended{
    width: 22%;
    margin-bottom: 20px;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
    background-color: #fff;
}

.assets ul {
    list-style: none;
    margin: 0;
    padding: 0;
  }
  
  .assets li {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
    font-size: 18px;
    color: #333;
  }
  
  .assets li .name {
    flex-grow: 1;
  }
  
  .assets li .price-positive {
    font-size: 16px;
    font-weight: 600;
    color: #009688;
  }
  .price-negative{
    color:red
  }
  .assets li .valor.positive {
    color: #4CAF50;
  }
  
  .assets li .valor.negative {
    color: #F44336;
  }
  .chart {
    width: 95%;
    height:200px;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
    background-color: #fff;
    order: 3;
  }
  
`