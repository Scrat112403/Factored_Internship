//Import components and styles
import React from 'react';
import { Radar } from 'react-chartjs-2';
import styles from '../index.css';

//Import necessary parts of Chart.js to build the spyder chart
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
} from 'chart.js';

//Register Chart.js components 
ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

//Render a radar chart
function SkillChart({ skills }) {
  //Extracts skill names and values from the passed-in skills object
  const labels = Object.keys(skills);      
  const values = Object.values(skills);    
  //Defines the data structure required by the Radar chart
  const data = {
    labels, //Array of skill names
    datasets: [
      {
        label: 'Skill Level',
        data: values, //Array of scores
        backgroundColor: '#1976d24d', 
        borderColor: '#1976d2',       
        borderWidth: 3,                             
        pointBackgroundColor:'#1976d24d'
      }
    ]
  };

  //Defines configuration options 
  const options = {
    responsive: true, //Makes the chart scale with screen size
    scales: {
      r: {
        angleLines: {
          color: '#1976d24d', 
          lineWidth: 3                      
        },
        grid: {
          color: '#1976d24d', 
          lineWidth: 3                      
        },
        pointLabels: {
          color: 'white',     
          font: {
            size: 16,
            weight: 'bold'   
          }
        },
        ticks: {
          beginAtZero: true, //Starts scale at 0
          max: 100,          //Max scale value
          color: 'white',    
          font: {
            size: 14         
          }
        }
      }
    },
    plugins: {
      legend: {
        labels: {
          color: 'white',     
          font: {
            size: 16          
          }
        }
      }
    }
  };

  //Returns the chart inside a centered container
  return (
    <div style={{ textAlign: 'center' }}>
      <div style={{ display: 'inline-block' }}>
        <Radar data={data} options={options} width={800} height={800} />
      </div>
    </div>
  );
}

export default SkillChart;
