import React from 'react';
import { Radar } from 'react-chartjs-2';
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
        borderWidth: 2,
        pointBackgroundColor: 'rgba(25, 118, 210, 1)',
      }
    ]
  };

  const options = {
    responsive: true,
    scale: {
      ticks: { beginAtZero: true, max: 100 }
    }
  };

  return <Radar data={data} options={options} />;
}

export default SkillChart;
