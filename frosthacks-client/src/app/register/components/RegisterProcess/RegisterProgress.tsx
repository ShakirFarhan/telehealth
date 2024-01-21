"use client";
import React, {useState, useContext} from 'react';
import styles from "./RegisterProgress.module.css";
import { AppContext } from '@/context/AppContext';
import { AppContextTypes } from '@/types/Context';

const RegisterProgress = () => {

    const appContext = useContext(AppContext) as AppContextTypes;
    const { sectionsDone } = appContext;

    return (
        <div className={styles.progress}>
            {
                Array.from({length: 6}).map((_, index) => {
                    return (
                        <span className={`${styles.point} ${ ((index + 1) <= sectionsDone) && styles.make__progress } ${index === sectionsDone && styles.making__progress}`} key={index}>{index + 1}</span>
                    )
                })
            }
        </div>
    )
}

export default RegisterProgress