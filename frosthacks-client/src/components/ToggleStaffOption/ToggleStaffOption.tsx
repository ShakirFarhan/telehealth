"use client";
import React, { useEffect } from 'react'
import { useDebouncedCallback } from 'use-debounce';
import styles from "./ToggleStaffOption.module.css";
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

const ToggleStaffOption = () => {

    const { staff__toggle, staff__active } = styles;

    const searchParams = useSearchParams();
    const router = useRouter();
    const pathName = usePathname();
    const params = new URLSearchParams(searchParams);

    useEffect(() => {
        params.set('staffType', 'doctors');
        router.replace(`${pathName}?${params.toString()}`);
        // eslint-disable-next-line
    }, []);
    
    const handleStaffChange = useDebouncedCallback((staffType: string) => {
        console.log(staffType);
        params.set('staffType', staffType);
        router.replace(`${pathName}?${params.toString()}`);
    }, 50);

    return (
        <div className={staff__toggle}>
            <button type='button' className={`${searchParams.get('staffType') === 'doctors' && staff__active}`} onClick={() => {handleStaffChange('doctors')}}>Doctors</button>
            <button type='button' className={`${searchParams.get('staffType') === 'paramedics' && staff__active}`} onClick={() => {handleStaffChange('paramedics')}}>Paramedics</button>
        </div>
    )
}

export default ToggleStaffOption;