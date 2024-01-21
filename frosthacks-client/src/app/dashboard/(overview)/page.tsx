import React, { useContext } from 'react';
import styles from '../page.module.css';
// React Icons
import { MdDone } from 'react-icons/md';
import { BsBagPlus } from 'react-icons/bs';
import { FaHandPaper } from 'react-icons/fa';
import { CiStethoscope } from 'react-icons/ci';
import { LiaAmbulanceSolid } from 'react-icons/lia';

// Components
import RefreshHint from './RefreshHint';
import DashboardBar from '@/components/DashboardBar/DashboardBar';
import DashboardArea from '@/components/DashboardArea/DashboardArea';

const page = () => {
  const {
    app__dashboard,
    dashboard__head,
    dashboard__main,
    dashboard__areas,
    area__charts,
    bed__count,
    dashboard__bars,
  } = styles;

  return (
    <main className={app__dashboard}>
      <div className={dashboard__head}>
        <p>Welcome 👋</p>
        <RefreshHint />
      </div>

      <main className={dashboard__main}>
        <section className={dashboard__bars}>
          <DashboardBar
            Icon={MdDone}
            aboutCases="Total number of cases"
            caseCount={400}
            labelA="Accepted Cases"
            labelB="Rejected Cases"
            colorA="#14A84E"
            colorB="#BA1A1A"
          />
        </section>

        <section className={dashboard__areas}>
          <DashboardArea
            Icon={BsBagPlus}
            labelA="Total Case Requests"
            labelB="Cases Handled Till Date"
            colorA="#b9017f"
            colorB="#105cae"
          />
        </section>
      </main>
    </main>
  );
};

export default page;
