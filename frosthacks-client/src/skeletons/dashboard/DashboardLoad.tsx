import React from 'react'
import styles from "./DashboardLoad.module.css";

// Skeletons
import TitleBar from '../titlebar/TitleBar';

const DashboardLoad = () => {
  return (
    <main className={styles.dashboardSkeleton}>
      <TitleBar />
      <div className={styles.dashboardSkeleton__main}>
        <EachChartLoad/>
        <EachChartLoad/>
        <EachChartLoad/>
        <EachChartLoad/>
      </div>
    </main>
  );
}

export default DashboardLoad;

const EachChartLoad = () => {
    return (
      <section className={styles.dashboard__side}>
        <div className={styles.dashboard__head}></div>
        <div className={styles.dashboard__info}></div>
      </section>
    );
}