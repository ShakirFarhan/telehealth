'use client';
import React from 'react'
import styles from "./AddNewCase.module.css";

import { LiveCaseTypes } from '@/types';
import { CardBodyDetail } from '../LiveCaseCard/LiveCaseCard';
import { acceptCase } from '@/app/dashboard/allcases/actions';

const AddNewCase = ({ _id, gender, age, caseType, name }: LiveCaseTypes) => {
    const {livecase__card, card__body} = styles;

    return (
        <article className={livecase__card}>
            <div className={styles.card__head}>
                <h1>New case</h1>
            </div>
            <div className={card__body}>
                <CardBodyDetail name='Name' value={name} bgColor=""/>
                <CardBodyDetail name='Gender' value={gender} bgColor=""/>
                <CardBodyDetail name='Age' value={age} bgColor=""/>
                <CardBodyDetail name='Case Type' value={caseType} bgColor=""/>
            </div>
            <div className={styles.accept__request}>
                <button type='button' onClick={async () => {
                    await acceptCase(_id)
                }}>Accept</button>
                <button type='button'>Reject</button>
            </div>
        </article>
    )
}

export default AddNewCase;