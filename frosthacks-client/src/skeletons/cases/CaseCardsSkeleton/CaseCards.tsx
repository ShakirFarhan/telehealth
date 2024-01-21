import React from 'react'
import styles from "./CaseCards.module.css"
import TitleBar from '@/skeletons/titlebar/TitleBar';

export const EachCaseCard = () => {
    return (
      <div className={styles.casecard__skeleton}>
        <p className={styles.casecard__title}></p>
        <div className={styles.casecard__item}></div>
        <div className={styles.casecard__item}></div>
        <div className={styles.casecard__item}></div>
      </div>
    );
}

const CaseCards = () => {
  return (
    <main className={styles.casecardSkeleton}>
      <TitleBar/>
      <div className={styles.casecardSkeleton__main}>
        <EachCaseCard />
        <EachCaseCard />
        <EachCaseCard />
        <EachCaseCard />
      </div>
    </main>
  );
}

export default CaseCards