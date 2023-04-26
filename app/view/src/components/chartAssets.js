import React,{useRef,useEffect} from 'react'
import Chart from 'chart.js/auto';

function ChartAssets(){

    const chartRef = useRef();

    useEffect(() => {
      const ctx = chartRef.current.getContext('2d');
      const myChart = new Chart(ctx, {
        type: 'line',
        data: {
          labels: ['Jan', 'Fev', 'Mar','ABR'],
          datasets: [
            {
              label: 'Balance',
              data: [4500, 5500,5250, 5000],
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
  
    return <canvas ref={chartRef} />
      
    
}

export default ChartAssets