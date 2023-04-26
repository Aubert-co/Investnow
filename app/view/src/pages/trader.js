import React,{useRef,useEffect} from "react";
import {useParams} from "react-router-dom"
import Header from "../components/header";
import { Container } from "../styles/Container";
import { MainStyle } from "../styles/MainStyle";
import Chart from 'chart.js/auto';
import styled from "styled-components";

const ChartStyle = styled.main`
display: flex;
	flex-direction: row;
	justify-content: space-between;
	margin: 20px;
    .chart {
	flex: 3;
	margin-right: 20px;
	background-color: #fff;
	border: 1px solid #ccc;
	padding: 20px;
}

/* Estilos da parte de compra/venda */
.trading {
    display: flex;
	flex: 1;
	background-color: rgb(75, 168, 75);
	border: 1px solid #ccc;
	padding: 20px;
    max-width: 70%;
    justify-content: center;
}

.trading h2 {
	margin-top: 0;
}

/* Estilos do formulário de compra/venda */
form {
	display: flex;
	flex-direction: column;
    max-width: 50%;
}

label {
	margin-top: 10px;
}

input,
select {
	padding: 5px;
	margin-bottom: 10px;
	border-radius: 5px;
	border: 1px solid #ccc;
}

button {
	background-color: #333;
	color: #fff;
	padding: 10px;
	border: none;
	border-radius: 5px;
	cursor: pointer;
}
.buy{
    background-color: rgb(75, 168, 75);
}
`
const ChartTrade = ({assetsName})=>{
  
    const chartRef = useRef("");

    useEffect(() => {
      const ctx = chartRef.current.getContext('2d');
      const myChart = new Chart(ctx, {
        type: 'line',
        data: {
          labels: ['Jan', 'Fev', 'Mar','Abr'],
          datasets: [
            {
              label: assetsName,
              data: [25000, 27000, 28000,29999],
              borderColor: 'black',
              fill: true,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
        },
      });
      return () => {
        myChart.destroy();
      };
    }, []);
    return <canvas ref={chartRef}/> 
}
function Trader(){
    const {assets} = useParams()
  

      
    return (
            <Container>
                <Header/>
                <ChartStyle>
                <div className="chart">
                    <ChartTrade  assetsName={assets}  />
                </div>
                <div class="trading">
                
                    <form>
                        
                        <label for="quantity">Quantity:</label>
                        <input type="number" id="quantity" name="quantity" required/>
                        
                        <label for="price">Price:</label>
                        <input type="number" id="price" name="price" required/>
                        
                        <label for="action">Ação:</label>
                        <select id="action" name="action" required>
                            <option class="buy" value="buy">Buy</option>
                            <option value="sell">Sell</option>
                        </select>
                        
                        <button type="submit">Enviar</button>
                    </form>
                </div>    
                </ChartStyle>
            </Container>
    )
}


export default Trader