"use client";
import {useState} from "react";
import styles from "./CaseContactOptions.module.css";

// React Icons
import { BsChatLeftText } from 'react-icons/bs';
import { MdCall, MdDocumentScanner, MdOutlineAssignmentTurnedIn } from 'react-icons/md';

const CaseContactOptions = () => {

    const [currentContactOption, setCurrentContactOption] = useState<string>('');
    
    return (
        <>
            <HeadButton option={currentContactOption} setOption={setCurrentContactOption} label='Video Request' bgColor='#215FF2' />
            <CaseContactPopup currentOption={currentContactOption} />
        </>
    )
}

export const HeadButton = ({bgColor, label, option, setOption}: { bgColor: string, label: string, option: string, setOption: (a: string) => void }) => {

    return (
        <button title={label} style={{ backgroundColor: bgColor }} type='button' onClick={(e) => {
            (option === e.currentTarget.textContent) ? setOption('') : setOption(e.currentTarget.textContent as string);
        }}><MdCall fontSize={17}/><p>{label}</p></button>
    )
}

export default CaseContactOptions;

export const CaseContactPopup = ({currentOption}: {currentOption: string}) => {

    const { pop__up, show__up } = styles;

    return (
        <section className={`${pop__up} ${currentOption !== '' && show__up}`}>
            {
                currentOption === 'Call' ? <CallPopup/> : currentOption === 'Talk' ? <TalkPopup/> : currentOption === 'Documents' ? <DocumentsPopup/> : currentOption === 'Assign' ? <AssignPopup/> : <></>
            }
        </section>
    )
}

const CallPopup = () => {
    return (
        <div>Call</div>
    )
}

const TalkPopup = () => {
    return (
        <div>Talk</div>
    )
}

const DocumentsPopup = () => {
    return (
        <div>Documents</div>
    )
}

const AssignPopup = () => {
    return (
        <div>Assign</div>
    )
}