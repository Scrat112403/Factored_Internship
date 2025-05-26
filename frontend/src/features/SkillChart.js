import React from 'react';
import { Radar } from 'react-chartjs-2';
import styles from '../index.css';
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

function SkillChart({ skills }) {
  const labels = Object.keys(skills);
  const values = Object.values(skills);

  const data = {
    labels,
    datasets: [
      {
        label: 'Skill Level',
        data: values,
        backgroundColor: 'rgba(25, 118, 210, 0.3)',
        borderColor: 'rgba(25, 118, 210, 1)',
        borderWidth: 3,
        pointBackgroundColor: 'rgba(25, 118, 210, 1)',
      }
    ]
  };

const options = {
  responsive: true,
  scales: {
    r: {
      angleLines: {
        color: 'rgba(25, 118, 210, 0.3)',
        lineWidth: 3
      },
      grid: {
        color: 'rgba(25, 118, 210, 0.3)',
        lineWidth: 3
      },
      pointLabels: {
        color: 'white', // ✅ blanco o cualquier color visible
        font: {
          size: 16,       // ✅ tamaño real del nombre del skill
          weight: 'white'
        }
      },
      ticks: {
        beginAtZero: true,
        max: 100,
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


  return <div style={{ textAlign: 'center' }}>
  <div style={{ display: 'inline-block' }}>
    <Radar data={data} options={options} width={800} height={800} />
  </div>
</div>

}

export default SkillChart;
