import React, { Suspense } from 'react';
import styles from './page.module.css';

// React Icons
import { FaStarOfLife } from 'react-icons/fa';

// Skeletons
import { EachCaseCard } from '@/skeletons/cases/CaseCardsSkeleton/CaseCards';

// Components
import LiveCases from '@/components/LiveCaseCard/LiveCaseCard';

// Next
import { cookies } from 'next/headers';

// Types
import { LiveCaseTypes } from '@/types';

// Call for fetching all the cases currently in hospital

const fetchAllCases = async () => {
  try {
    const allCasesResponse = await fetch(
      'https://frosthacks-backend.onrender.com/api/v1/hospital/case/me',
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${cookies().get('hospAdminToken')?.value}`,
        },
      }
    );

    try {
      const allCasesResponse = await fetch(
        'https://frosthacks-backend.onrender.com/api/v1/hospital/case/me',
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${cookies().get('hospAdminToken')?.value}`,
          },
        }
      );

      if (!allCasesResponse.ok) {
        throw new Error('Issue loading cases!');
      }

      const { cases } = await allCasesResponse.json();

      return cases;
    } catch (error) {
      console.log(error);
    }

    const { cases } = await allCasesResponse.json();

    return cases;
  } catch (error) {
    throw new Error('Error loading cases!');
  }
};

const page = async () => {
  const { dashboard__livecases, livecases__head, livecases__main } = styles;

  const cases: LiveCaseTypes[] = await fetchAllCases();

  return (
    <main className={dashboard__livecases}>
      <div className={livecases__head}>
        <FaStarOfLife fontSize={21} color={'#BA1A1A'} />
        <p>Live Cases</p>
      </div>

      <section className={livecases__main}>
        {cases.length === 0 ? (
          <p>No cases are currently active!</p>
        ) : (
          <LiveCases cases={cases} />
        )}
      </section>
    </main>
  );
};

export default page;
