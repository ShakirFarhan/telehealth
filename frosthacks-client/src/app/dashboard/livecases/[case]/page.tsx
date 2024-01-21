import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import styles from './page.module.css';

// React Icons
import { IconType } from 'react-icons';
import { CiLocationOn } from "react-icons/ci";
import { CgBoy, CgGirl } from "react-icons/cg";
import { AiOutlineHeart } from "react-icons/ai";
import { MdSpatialAudioOff } from "react-icons/md";
import { FaTemperatureHalf } from "react-icons/fa6";
import { IoIosPulse, IoMdEye } from "react-icons/io";
import { IoArrowBackOutline } from "react-icons/io5";
import { BiSolidUserRectangle } from "react-icons/bi";
import { FaStarOfLife, FaHandPaper } from "react-icons/fa";
import { CardBodyDetail } from '@/components/LiveCaseCard/LiveCaseCard';
import { BsHeartPulse, BsArrowDownShort, BsArrowUpShort, BsDropletHalf } from "react-icons/bs";

// Components
import CaseContactOptions from '@/components/CaseContactOptions/CaseContactOptions';
import VitalsChart from '@/components/VitalsChart/VitalsChart';
import { LiveCaseTypes } from '@/types';
import { cookies } from 'next/headers';

export const metadata: Metadata = {
  title: `Case | Live Cases`,
  description: "Current Case with a Case ID of Assignment",
};

// Fetch for a Case Details

const fetchACase = async (caseId: string) => {

    try {
        
        const caseResponse = await fetch(`https://frosthacks-backend.onrender.com/api/v1/hospital/cases/${caseId}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${cookies().get('hospAdminToken')?.value}`
            }
        })

        if (!caseResponse.ok) {
            console.log(await caseResponse.json())
            throw new Error("Could not get the data");
        }

        const caseData: { case: LiveCaseTypes } = await caseResponse.json();

        return caseData.case;


    } catch (error) {
        throw new Error('Server issue while loading case details...');
    }

}

const page = async ({params}: {params: { case: string }}) => {

    const { current__case, case__head, head__side, head__talk, livecase__main, general__info, patient__info, info__head, info__caseId, patient__case, general__title, case__details, patient__vitals, vitals__details, other__info, vitals__charts, paramedic__loc, paramedic__map, health__info, healthInfo__main } = styles;

    const caseDetails: LiveCaseTypes = await fetchACase(params.case);

    return (
        <main className={current__case}>

            <div className={case__head}>
                <div className={head__side}>
                    <Link href="/dashboard/livecases">
                        <IoArrowBackOutline fontSize={21}/>
                    </Link>
                    <p>Case Details</p>
                </div>
                <div className={head__talk}>
                    <CaseContactOptions/>
                </div>
            </div>

            {/* Removed 1 */}

            {/* General & Vitals Information */}

            <section className={livecase__main}>

                <div className={general__info}>

                    <section className={patient__info}>
                        <div role='heading' aria-level={1} className={info__head}><CgBoy fontSize={24} color="#686868" /><p>{caseDetails.name}</p></div>
                    </section>

                    <section className={patient__case}>
                        <div role='heading' aria-level={2} className={general__title}><BiSolidUserRectangle fontSize={18} color="#215FFA"/><p>General Information</p></div>
                        <div className={case__details}>
                            <CardBodyDetail name='Age' value={caseDetails.age} bgColor="#FFF"/>
                            <CardBodyDetail name='Gender' value={caseDetails.gender} bgColor="#FFF"/>
                            <CardBodyDetail name='Case Type' value={caseDetails.caseType} bgColor="#FFF"/>
                        </div>
                    </section>

                    <section className={patient__vitals}>
                        <div role='heading' aria-level={2} className={general__title}><BsHeartPulse fontSize={18} color="red"/><p>Vital Information</p></div>
                        <div className={vitals__details}>
                            <VitalInfoCard label='Blood Pressure' HeadIcon={BsArrowUpShort} VitalIcon={AiOutlineHeart} vitalInfo={caseDetails.bp} infoOutput='Hypertensive Crisis' bgColor='#AD2E24' />
                            <VitalInfoCard label='Heart Rate' HeadIcon={BsArrowDownShort} VitalIcon={IoIosPulse} vitalInfo={`${caseDetails.heartRate} BPM`} infoOutput='Normal' bgColor='#41CB68' />
                            <VitalInfoCard label='SPO2' HeadIcon={BsArrowUpShort} VitalIcon={BsDropletHalf} vitalInfo={`${caseDetails.spo2}%`} infoOutput='Insufficient' bgColor='#FADA33' />
                            <VitalInfoCard label='Temperature' HeadIcon={FaTemperatureHalf} VitalIcon={FaTemperatureHalf} vitalInfo={`${caseDetails.temperature}F`} infoOutput='Controlled' bgColor='#a2db13' />
                        </div>
                    </section>

                </div>

                <div className={other__info}>

                    {/* We are gonna include charts representing vitals info soon... */}

                    <section className={vitals__charts}>
                        <VitalsChart/>
                    </section>
                    
                    <section className={health__info}>

                        <GlucoMeter glucoScore={caseDetails.eyeResponse + caseDetails.verbalResponse + caseDetails.motorResponse} verdict='Danger' />
                        <HealthDetailCard Icon={IoMdEye} iconColor='#65478F' label='Eye Response' count={caseDetails.eyeResponse} countFor='Pressure'/>
                        <HealthDetailCard Icon={MdSpatialAudioOff} iconColor='#30b7f5' label='Verbal Response' count={caseDetails.verbalResponse} countFor='Confused'/>
                        <HealthDetailCard Icon={FaHandPaper} iconColor='#a05efd' label='Motor Response' count={caseDetails.motorResponse} countFor='Confused'/>

                    </section>

                </div>

            </section>

            {/* Paramedic Location */}

            <section className={paramedic__loc}>
                <div role='heading' aria-level={2} className={general__title}><CiLocationOn fontSize={18} color="#215FFA"/><p>Paramedic Location</p></div>
                <div className={paramedic__map}>
                    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3806.7754031622476!2d78.45028360915332!3d17.422562901725005!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb91cb1dc49e8f%3A0xbab6cb3473be057d!2sNims%20Hospital!5e0!3m2!1sen!2sin!4v1700117291954!5m2!1sen!2sin" style={{border: "0", width: '100%', height: '100%', borderRadius: '12px', outline: 'none' }} allowFullScreen loading="lazy"></iframe>
                </div>
            </section>

        </main>
    )
}

export default page;

const VitalInfoCard = ({label, HeadIcon, VitalIcon, vitalInfo, infoOutput, bgColor}: {label: string, HeadIcon: IconType, vitalInfo: string, VitalIcon: IconType, infoOutput: string, bgColor: string}) => {
    return (
        <article className={styles.vitals__info}>
            <div className={styles.vitalsInfo__head}>
                <p>{label}</p>
                <HeadIcon fontSize={21}/>
            </div>
            <div className={styles.vitalsInfo__details}>
                <VitalIcon fontSize={20} />
                <p>{vitalInfo}</p>
            </div>
            <p style={{ backgroundColor: bgColor}} >{infoOutput}</p>
        </article>
    )
}

const HealthDetailCard = ({Icon, iconColor, label, count, countFor}: {Icon: IconType, iconColor: string, label: string, count: number, countFor: string }) => {
    return (
        <div className={styles.healthInfo__card}>
            <Icon fontSize={21} color={iconColor} />
            <p>{label}</p>
            <div className={styles.healthInfo__detail}>
                <p>{count}</p>
                <p>{countFor}</p>
            </div>
        </div>
    )
}

const GlucoMeter = ({glucoScore, verdict}: {glucoScore: number, verdict: string}) => {
    return (
        <div className={styles.gluco__meter}>
            <p>Glasgow Coma Score (GCS)</p>
            <div className={styles.glucoBar__box}>
                <p style={{ color: `${glucoScore < 8 ? 'rgb(247, 65, 65)' : glucoScore < 11 ? 'rgb(250, 250, 56)' : 'rgb(78, 245, 78)'}` }}>{glucoScore < 10 ? `0${glucoScore}` : glucoScore}</p>
                <p>Points</p>
            </div>
            <span style={{ backgroundColor: `${glucoScore < 8 ? 'rgb(247, 65, 65)' : glucoScore < 11 ? 'rgb(250, 250, 56)' : 'rgb(78, 245, 78)'}` }}>{verdict}</span>
        </div>
    )
}


// *************************************** Removed Changes **************************************