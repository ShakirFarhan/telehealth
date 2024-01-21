import React from 'react'
import styles from "./DashboardArea.module.css";

// Charts
import AreaChart from '../Charts/AreaChart';

// Types
import { AreaChartsDataProps } from '@/types';

const DashboardArea = ({Icon, labelA, labelB, colorA, colorB}: AreaChartsDataProps) => {
  return (
    <article className={styles.cases__chart}>
      <div className={styles.area__chart}><AreaChart labelA={labelA} labelB={labelB} colorA={colorA} colorB={colorB}/></div>
    </article>
  )
}

export default DashboardArea;