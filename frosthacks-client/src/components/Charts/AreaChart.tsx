"use client";
import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Filler, Tooltip, Legend } from 'chart.js'

ChartJS.register( CategoryScale, LinearScale, PointElement, LineElement, Title, Filler, Tooltip, Legend);

export default function AreaChart({
  labelA, labelB,
  colorA, colorB
}: {
  labelA: string, labelB: string,
  colorA: string, colorB: string
}) {

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false
      },
      title: {
        display: false,
      },
    },
    scales: {
      y: {
        gridLines: {
          display: false
        },
        ticks: {
          stepSize: 25
        },
      },
    },
  };
  
  const labels = ['Jan', 'Feb', 'March', 'April', 'May', 'June'];
  
  const data = {
    labels,
    datasets: [
      {
        fill: true,
        label: labelA,
        data: [10, 40, 24, 21, 50, 79],
        borderColor: colorA,
        lineTension: 0.3
      },
      {
        fill: true,
        label: labelB,
        data: [19, 90, 24, 42, 30, 56],
        borderColor: colorB,
        lineTension: 0.3
      },
      
    ],
  };  

  return <Line options={options} data={data} />;
}
