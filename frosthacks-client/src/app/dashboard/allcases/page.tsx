import React, { Suspense } from 'react'
import styles from './page.module.css';

// React Icons
import { FaStarOfLife } from "react-icons/fa";

// Skeletons
import { EachCaseCard } from '@/skeletons/cases/CaseCardsSkeleton/CaseCards';

// Next
import { cookies } from 'next/headers';

// Types
import { LiveCaseTypes } from '@/types';

// Components
import AddNewCase from '@/components/AddNewCase/AddNewCase';


// Call for fetching all the cases currently in hospital

const fetchAllCases = async () => {

    try {

        const allCasesResponse = await fetch('https://frosthacks-backend.onrender.com/api/v1/hospital/case/all', {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${cookies().get('hospAdminToken')?.value}`
            }
        })

        if (!allCasesResponse.ok) {
            throw new Error('Issue loading cases!');
        }

        const { cases } = await allCasesResponse.json();

        return cases;

    } catch (error) {
        throw new Error('Error loading cases!');

    }

}


const page = async () => {

    const { dashboard__livecases, livecases__head, livecases__main } = styles;

    const cases: LiveCaseTypes[] = await fetchAllCases();

    return (
        <main className={dashboard__livecases}>
            
            <div className={livecases__head}>
                <FaStarOfLife fontSize={21} color={'#BA1A1A'}/>
                <p>Live Cases</p>
            </div>

            <section className={livecases__main}>
                {
                    cases.length === 0 ? (
                        <p>There is no case to accept/reject!</p>
                    ) : (
                        cases.map((_) => {
                            return (
                                <Suspense key={_._id} fallback={<EachCaseCard/>}>
                                    <AddNewCase {..._} />
                                </Suspense>
                            )
                        })
                    )
                }
            </section>

        </main>
    )
}

export default page