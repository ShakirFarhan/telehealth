import React from 'react'
import Link from 'next/link';
import styles from "./LiveCaseCard.module.css";

// Types
import { LiveCaseTypes } from '@/types';

const LiveCaseCard = ({age, gender, caseType, _id, name }: LiveCaseTypes) => {

    const {livecase__card, card__head, card__body} = styles;

    return (
        <article className={livecase__card}>
            <div className={card__head}>
                <p>Live Case</p>
                <Link href={`/dashboard/livecases/${_id}`}>View Case</Link>
            </div>
            <div className={card__body}>
                <CardBodyDetail name='Name' value={name} bgColor=""/>
                <CardBodyDetail name='Gender' value={gender} bgColor=""/>
                <CardBodyDetail name='Age' value={age} bgColor=""/>
                <CardBodyDetail name='Case Type' value={caseType} bgColor=""/>
            </div>
        </article>
    )
}

export const CardBodyDetail = ({name, value, bgColor}: {name: string, value: string | number, bgColor: "" | "#FFF"}) => {
    return (
        <div className={styles.body__detail} style={{backgroundColor: bgColor}} >
            <p>{name}</p>
            <span></span>
            <p>{value}</p>
        </div>  
    )
}


export default function LiveCases ({ cases }: { cases: LiveCaseTypes[] }) {
    return (
        <>
            {
                cases.map((_, index) => {
                    return (
                        <LiveCaseCard key={_._id} {..._} />
                    )
                })
            }
        </>
    )
} 