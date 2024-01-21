"use client";
import React from 'react'
import styles from "./VitalsChart.module.css";

// Reach-Chartjs-2
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
ChartJS.register( CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend );

// React Icons
import {BsArrowUpShort, BsArrowDownShort} from "react-icons/bs";

const VitalsChart = () => {
  return (
    <div className={styles.vital__chart}>
        <div className={styles.chart__head}>
            <p>Blood Pressure</p>
            <BsArrowUpShort fontSize={20} color={'red'} />
        </div>
        <div className={styles.chart__main}>
            <EachVitalChart/>
        </div>
    </div>
  )
}

export default VitalsChart;

const EachVitalChart = () => {

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
    };
      
    const labels = ['1', '2', '3', '4', '5', '6'];
      
    const data = {
        labels,
        datasets: [
          {
            label: 'Rate',
            data: [1,10,32,21,40, 80],
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
          }
        ],
    };

    return (
        <Line options={options} data={data} />
    )
}